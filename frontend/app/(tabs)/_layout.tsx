import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Home, PieChart, Brain, User } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface, // Fallback
          borderTopColor: Colors.surfaceLight,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 1,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: 'rgba(30,30,30, 0.95)' }} />
        ),
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => <PieChart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'AI Coach',
          tabBarIcon: ({ color, size }) => <Brain color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
