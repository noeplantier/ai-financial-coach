import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell } from 'lucide-react-native';
import { MotiView } from 'moti';

interface HeaderProps {
  greeting?: string;
  userName: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  greeting = 'Good Morning',
  userName,
  notificationCount = 0,
  onNotificationPress,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 600 }}
      >
        <Text style={styles.greeting}>{greeting || getGreeting()}</Text>
        <LinearGradient
          colors={['#FFD700', '#FFA500', '#FF8C00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.userNameGradient}
        >
          <Text style={styles.userName}>{userName}</Text>
        </LinearGradient>
      </MotiView>

      {notificationCount > 0 && (
        <MotiView
          from={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 300 }}
        >
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.notificationGradient}
            >
              <Bell color="#1A1A1A" size={20} strokeWidth={2.5} />
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </MotiView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#A0A0A0',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  userNameGradient: {
    marginTop: 6,
    paddingVertical: 2,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255, 215, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  notificationButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  notificationGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3B30',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});