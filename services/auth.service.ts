import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export const authService = {
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? '',
        redirectTo
      );

      if (res.type === 'success') {
        const { url } = res;
        await createSessionFromUrl(url);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  async updateUserProfile(updates: {
    full_name?: string;
    avatar_url?: string;
    additional_google_data?: any;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          last_login: new Date().toISOString(),
          ...updates,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async validateEmailDomain(email: string): Promise<boolean> {
    // Optional: Restrict to @cecytem.edu.mx domain
    const allowedDomain = '@cecytem.edu.mx';
    return email.endsWith(allowedDomain);
  },

  // Handle deep linking for auth
  handleAuthRedirect(url: string) {
    if (Platform.OS === 'web') return;
    
    const { hostname, path, queryParams } = Linking.parse(url);
    
    if (hostname === 'auth' && path === 'callback') {
      createSessionFromUrl(url);
    }
  },
};