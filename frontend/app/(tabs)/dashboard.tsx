import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { Wallet, Target, TrendingUp, CreditCard } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data pour le développement
const mockCards = [
  {
    id: '1',
    type: 'visa',
    card_number_last4: '4242',
    card_holder: 'JOHN DOE',
    expiry_date: '12/25',
    balance: 5420.50,
  },
  {
    id: '2',
    type: 'mastercard',
    card_number_last4: '8888',
    card_holder: 'JOHN DOE',
    expiry_date: '09/24',
    balance: 2150.75,
  },
];

const Widget = ({ icon: Icon, title, value, color }) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'timing', duration: 300 }}
    style={[styles.widget, { borderLeftColor: color }]}
  >
    <Icon color={color} size={24} />
    <Text style={styles.widgetTitle}>{title}</Text>
    <Text style={styles.widgetValue}>{value}</Text>
  </MotiView>
);

const BankCard = ({ type, last4, holder, expiry, balance }) => (
  <View style={[styles.card, type === 'visa' ? styles.visaCard : styles.mastercardCard]}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardType}>{type.toUpperCase()}</Text>
      <CreditCard color="#fff" size={32} />
    </View>
    <Text style={styles.cardNumber}>•••• •••• •••• {last4}</Text>
    <View style={styles.cardFooter}>
      <View>
        <Text style={styles.cardLabel}>Card Holder</Text>
        <Text style={styles.cardHolder}>{holder}</Text>
      </View>
      <View>
        <Text style={styles.cardLabel}>Expires</Text>
        <Text style={styles.cardExpiry}>{expiry}</Text>
      </View>
    </View>
    <Text style={styles.cardBalance}>${balance.toLocaleString()}</Text>
  </View>
);

export default function Dashboard() {
  const [cards, setCards] = useState(mockCards);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const total = cards.reduce((sum, card) => sum + card.balance, 0);
    setTotalBalance(total);
  }, [cards]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Total Balance */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${totalBalance.toLocaleString()}</Text>
        <Text style={styles.balanceChange}>+2.5% from last month</Text>
      </MotiView>

      {/* Widgets */}
      <View style={styles.widgetsContainer}>
        <Widget icon={Wallet} title="Expenses" value="$2,847" color="#FF6B6B" />
        <Widget icon={TrendingUp} title="Income" value="$8,240" color="#4ECDC4" />
        <Widget icon={Target} title="Goal" value="85%" color="#2196F3" />
      </View>

      {/* Bank Cards Section */}
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
          keyExtractor={(item) => item.id}
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
              />
            </MotiView>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    backgroundColor: '#FF6B6B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: '#6C63FF',
    margin: 20,
    padding: 24,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceChange: {
    color: '#4ECDC4',
    fontSize: 14,
    marginTop: 8,
  },
  widgetsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  widget: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  widgetTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  widgetValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  cardsSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAll: {
    color: '#6C63FF',
    fontSize: 14,
  },
  card: {
    width: width * 0.8,
    height: 200,
    borderRadius: 16,
    padding: 20,
    marginLeft: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  visaCard: {
    backgroundColor: '#1A1A2E',
  },
  mastercardCard: {
    backgroundColor: '#EB1C26',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 20,
    marginTop: 30,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  cardHolder: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  cardBalance: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});