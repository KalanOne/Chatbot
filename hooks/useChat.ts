import { useState, useEffect, useCallback } from 'react';
import { chatService } from '@/services/chat.service';
import { useAuth } from '@/hooks/useAuth';
import { Database } from '@/types/database';

type Chat = Database['public']['Tables']['chats']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];

export function useChat(initialChatId?: string) {
  const { user } = useAuth();
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize or create chat
  const initializeChat = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let chat: Chat;

      if (initialChatId) {
        // Try to load existing chat
        const history = await chatService.getChatHistory(initialChatId);
        setMessages(history);
        // We need to get the chat details too
        // For now, we'll create a new one if not found
        chat = await chatService.createChat(user?.id);
      } else {
        // Create new chat
        chat = await chatService.createChat(user?.id, {
          platform: 'mobile',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
      }

      setCurrentChat(chat);

      // Load chat history
      const history = await chatService.getChatHistory(chat.id);
      setMessages(history);

    } catch (err) {
      console.error('Error initializing chat:', err);
      setError('Error al inicializar el chat');
    } finally {
      setLoading(false);
    }
  }, [initialChatId, user?.id]);

  // Add message to chat
  const addMessage = useCallback(async (
    content: string,
    senderType: 'user' | 'bot',
    metadata?: any
  ) => {
    if (!currentChat) {
      throw new Error('No hay chat activo');
    }

    try {
      const message = await chatService.addMessage(
        currentChat.id,
        content,
        senderType,
        metadata
      );

      setMessages(prev => [...prev, message]);
      return message;
    } catch (err) {
      console.error('Error adding message:', err);
      throw new Error('Error al enviar mensaje');
    }
  }, [currentChat]);

  // Archive current chat
  const archiveChat = useCallback(async () => {
    if (!currentChat) return;

    try {
      await chatService.updateChatStatus(currentChat.id, 'archived');
      setCurrentChat(prev => prev ? { ...prev, status: 'archived' } : null);
    } catch (err) {
      console.error('Error archiving chat:', err);
      throw new Error('Error al archivar chat');
    }
  }, [currentChat]);

  // Start new chat
  const startNewChat = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Archive current chat if exists
      if (currentChat && currentChat.status === 'active') {
        await chatService.updateChatStatus(currentChat.id, 'archived');
      }

      // Create new chat
      const newChat = await chatService.createChat(user?.id, {
        platform: 'mobile',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      setCurrentChat(newChat);
      setMessages([]);
    } catch (err) {
      console.error('Error starting new chat:', err);
      setError('Error al crear nuevo chat');
    } finally {
      setLoading(false);
    }
  }, [currentChat, user?.id]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!currentChat) return;

    const subscription = chatService.subscribeToMessages(
      currentChat.id,
      (newMessage) => {
        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(msg => msg.id === newMessage.id)) {
            return prev;
          }
          return [...prev, newMessage];
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [currentChat]);

  // Initialize chat on mount
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  return {
    currentChat,
    messages,
    loading,
    error,
    addMessage,
    archiveChat,
    startNewChat,
    initializeChat,
  };
}