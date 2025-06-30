export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          last_login: string | null;
          additional_google_data: any | null;
        };
        Insert: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          last_login?: string | null;
          additional_google_data?: any | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          last_login?: string | null;
          additional_google_data?: any | null;
        };
      };
      chats: {
        Row: {
          id: string;
          user_id: string | null;
          started_at: string;
          status: 'active' | 'archived';
          session_data: any | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          started_at?: string;
          status?: 'active' | 'archived';
          session_data?: any | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          started_at?: string;
          status?: 'active' | 'archived';
          session_data?: any | null;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          content: string;
          timestamp: string;
          sender_type: 'user' | 'bot';
          metadata: any | null;
        };
        Insert: {
          id?: string;
          chat_id: string;
          content: string;
          timestamp?: string;
          sender_type: 'user' | 'bot';
          metadata?: any | null;
        };
        Update: {
          id?: string;
          chat_id?: string;
          content?: string;
          timestamp?: string;
          sender_type?: 'user' | 'bot';
          metadata?: any | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      chat_status: 'active' | 'archived';
      sender_type: 'user' | 'bot';
    };
  };
}