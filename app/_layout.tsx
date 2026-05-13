import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { LoginScreen } from './auth/login';
import { RootNavigator } from './root-navigator';

function RootLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return <Stack><Stack.Screen name="splash" options={{ headerShown: false }} /></Stack>;
  }

  if (!session) {
    return <LoginScreen />;
  }

  return <RootNavigator />;
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
