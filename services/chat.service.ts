import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Chat = Database['public']['Tables']['chats']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];
type InsertMessage = Database['public']['Tables']['messages']['Insert'];
type InsertChat = Database['public']['Tables']['chats']['Insert'];

export const chatService = {
  async createChat(userId?: string, sessionData?: any): Promise<Chat> {
    try {
      const chatData: InsertChat = {
        user_id: userId || null,
        started_at: new Date().toISOString(),
        status: 'active',
        session_data: sessionData || null,
      };

      const { data, error } = await supabase
        .from('chats')
        .insert(chatData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  },

  async getChatHistory(chatId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },

  async getUserChats(userId: string): Promise<Chat[]> {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', userId)
        .order('started_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user chats:', error);
      throw error;
    }
  },

  async addMessage(
    chatId: string,
    content: string,
    senderType: 'user' | 'bot',
    metadata?: any
  ): Promise<Message> {
    try {
      const messageData: InsertMessage = {
        chat_id: chatId,
        content,
        sender_type: senderType,
        timestamp: new Date().toISOString(),
        metadata: metadata || null,
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },

  async updateChatStatus(chatId: string, status: 'active' | 'archived'): Promise<void> {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ status })
        .eq('id', chatId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating chat status:', error);
      throw error;
    }
  },

  async updateChatSessionData(chatId: string, sessionData: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ session_data: sessionData })
        .eq('id', chatId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating chat session data:', error);
      throw error;
    }
  },

  // Real-time subscription for new messages
  subscribeToMessages(chatId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  },

  // Analytics helpers
  async getChatAnalytics(userId?: string) {
    try {
      let query = supabase
        .from('chats')
        .select(`
          id,
          started_at,
          status,
          messages(count)
        `);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching chat analytics:', error);
      throw error;
    }
  },

  async getMessageAnalytics(chatId?: string) {
    try {
      let query = supabase
        .from('messages')
        .select('sender_type, timestamp');

      if (chatId) {
        query = query.eq('chat_id', chatId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching message analytics:', error);
      throw error;
    }
  },
};