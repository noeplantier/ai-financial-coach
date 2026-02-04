import { Redirect, useAuth } from '@clerk/clerk-expo';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
