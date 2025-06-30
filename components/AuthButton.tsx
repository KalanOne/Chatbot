import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

export function AuthButton() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await authService.signInWithGoogle();
    } catch (error) {
      Alert.alert(
        'Error de autenticación',
        'No se pudo iniciar sesión con Google. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo cerrar sesión. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#4F46E5" />
      </View>
    );
  }

  if (user) {
    return (
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        disabled={loading}
      >
        <View style={styles.signOutContent}>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail} numberOfLines={1}>
              {user.email}
            </Text>
            <Text style={styles.signOutText}>Cerrar sesión</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#64748B" />
          ) : (
            <Feather name="log-out" size={16} color="#64748B" />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.signInButton}
      onPress={handleSignIn}
      disabled={loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.signInGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <Feather name="user" size={16} color="#FFFFFF" />
            <Text style={styles.signInText}>Iniciar sesión</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signInGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  signOutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userInfo: {
    flex: 1,
    marginRight: 8,
  },
  userEmail: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  signOutText: {
    fontSize: 11,
    color: '#64748B',
  },
});