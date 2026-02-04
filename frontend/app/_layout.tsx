import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { tokenCache } from '../utils/tokenCache';
import { View } from 'react-native';
import { Colors } from '../constants/Colors';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  console.error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <StatusBar style="light" />
        <Stack screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background }
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
