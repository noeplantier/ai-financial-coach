import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ParticleBackground } from '../../components/ParticleBackground';
import { GradientText } from '../../components/GradientText';
import { ThemedCard } from '../../components/ThemedCard';
import { BankCard } from '../../components/BankCard';
import { CryptoTicker } from '../../components/CryptoTicker';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { LogOut, ArrowRight, Wallet, TrendingUp, Target } from 'lucide-react-native';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

// Widget Component
const Widget = ({ icon: Icon, title, value, color }) => (
  <MotiView 
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'timing', duration: 500 }}
    style={[styles.widget, { borderColor: color }]}
  >
    <View style={[styles.widgetIcon, { backgroundColor: `${color}20` }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.widgetTitle}>{title}</Text>
    <Text style={styles.widgetValue}>{value}</Text>
  </MotiView>
);

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  const cards = [
    { _id: '1', type: 'visa', card_number_last4: '4242', card_holder: user?.fullName || 'User', expiry_date: '12/28', balance: 12500, color_theme: 'gold' },
    { _id: '2', type: 'mastercard', card_number_last4: '8899', card_holder: user?.fullName || 'User', expiry_date: '09/26', balance: 3400, color_theme: 'black' },
  ];

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 100 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Good Evening,</Text>
            <GradientText style={styles.title} numberOfLines={1}>{user?.firstName || 'Future Millionaire'}</GradientText>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.profileBtn}>
             <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {/* Widgets Row */}
        <View style={styles.widgetsRow}>
          <Widget icon={Wallet} title="Net Worth" value="$15,900" color={Colors.primary} />
          <Widget icon={TrendingUp} title="Monthly Gain" value="+12.5%" color={Colors.success} />
          <Widget icon={Target} title="Goal" value="85%" color="#2196F3" />
        </View>

        {/* Real Bank Cards Section */}
        <View style={styles.cardsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Wallets</Text>
            <TouchableOpacity>
               <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={cards}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <MotiView
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
              >
                <BankCard 
                  type={item.type} 
                  last4={item.card_number_last4} 
                  holder={item.card_holder}
                  expiry={item.expiry_date}
                  balance={item.balance}
                  theme={item.color_theme}
                />
              </MotiView>
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.cardsScroll}
          />
        </View>

        {/* Crypto Ticker */}
        <CryptoTicker />

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
        >
          <ThemedCard style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <Text style={styles.chartTitle}>AI Financial Insight</Text>
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>NEW</Text>
              </View>
            </View>
            <Text style={styles.aiText}>
              Your spending on "Dining Out" has decreased by 15% this month. Great job! Consider allocating the savings to your ETF portfolio.
            </Text>
            <TouchableOpacity style={styles.aiAction} onPress={() => router.push('/(tabs)/coach')}>
              <Text style={styles.aiActionText}>Ask Coach</Text>
              <ArrowRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </ThemedCard>
        </MotiView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 0, // Cards extend to edge, other content padded
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  greeting: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileBtn: {
    marginLeft: 10,
  },
  widgetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  widget: {
    width: (width - 60) / 3,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  widgetIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  widgetTitle: {
    color: Colors.textSecondary,
    fontSize: 10,
    marginBottom: 4,
  },
  widgetValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  seeAll: {
    color: Colors.primary,
    fontSize: 14,
  },
  cardsScroll: {
    paddingHorizontal: 20,
    paddingRight: 4,
  },
  aiCard: {
    marginHorizontal: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  aiBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  aiBadgeText: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  aiText: {
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  aiAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  aiActionText: {
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 4,
  },
});
