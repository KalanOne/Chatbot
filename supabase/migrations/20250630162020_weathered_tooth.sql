/*
  # Initial Schema for Chatbot Application

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, nullable)
      - `full_name` (text, nullable)
      - `avatar_url` (text, nullable)
      - `created_at` (timestamp)
      - `last_login` (timestamp, nullable)
      - `additional_google_data` (jsonb, nullable)
    
    - `chats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key, nullable)
      - `started_at` (timestamp)
      - `status` (enum: active/archived)
      - `session_data` (jsonb, nullable)
    
    - `messages`
      - `id` (uuid, primary key)
      - `chat_id` (uuid, foreign key)
      - `content` (text)
      - `timestamp` (timestamp)
      - `sender_type` (enum: user/bot)
      - `metadata` (jsonb, nullable)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and guest users
    - Ensure proper data access controls

  3. Indexes
    - Add indexes for performance optimization
    - Include indexes for analytics queries
*/

-- Create custom types
CREATE TYPE chat_status AS ENUM ('active', 'archived');
CREATE TYPE sender_type AS ENUM ('user', 'bot');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  additional_google_data jsonb
);

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  started_at timestamptz DEFAULT now(),
  status chat_status DEFAULT 'active',
  session_data jsonb
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid REFERENCES chats(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  sender_type sender_type NOT NULL,
  metadata jsonb
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Chats policies
CREATE POLICY "Users can read own chats"
  ON chats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read guest chats"
  ON chats
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Users can create own chats"
  ON chats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can create guest chats"
  ON chats
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can update own chats"
  ON chats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can update guest chats"
  ON chats
  FOR UPDATE
  TO anon
  USING (user_id IS NULL);

-- Messages policies
CREATE POLICY "Users can read messages from own chats"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Anonymous users can read messages from guest chats"
  ON messages
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND chats.user_id IS NULL
    )
  );

CREATE POLICY "Users can insert messages to own chats"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Anonymous users can insert messages to guest chats"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND chats.user_id IS NULL
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_started_at ON chats(started_at);
CREATE INDEX IF NOT EXISTS idx_chats_status ON chats(status);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_messages_sender_type ON messages(sender_type);

-- Create composite indexes for analytics
CREATE INDEX IF NOT EXISTS idx_messages_chat_timestamp ON messages(chat_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_chats_user_started ON chats(user_id, started_at);