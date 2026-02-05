import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { ParticleBackground } from '../../components/ParticleBackground';

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
  {
    id: '3',
    type: 'visa',
    card_number_last4: '1234',
    card_holder: 'JOHN DOE',
    expiry_date: '11/26',
    balance: 320.00,
  },
  {
    id: '4',
    type: 'mastercard',
    card_number_last4: '5678',
    card_holder: 'JOHN DOE',
    expiry_date: '03/23',
    balance: 780.20,
  },
  {
    id: '5',
    type: 'visa',
    card_number_last4: '9012',
    card_holder: 'JOHN DOE',
    expiry_date: '07/24',
    balance: 1500.00,
  }
];

// Composant Widget
const Widget = ({ icon, title, value, color, trend }) => (
  <View style={styles.widget}>
    <View style={styles.widgetContent}>
      <View style={[styles.widgetBorder, { borderColor: color }]} />
      <View style={styles.widgetHeader}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        {trend && (
          <View style={[styles.trendBadge, trend > 0 ? styles.trendUp : styles.trendDown]}>
            <Text style={[styles.trendIcon, trend > 0 ? styles.trendUpText : styles.trendDownText]}>
              {trend > 0 ? '↗' : '↘'}
            </Text>
            <Text style={[styles.trendText, trend > 0 ? styles.trendUpText : styles.trendDownText]}>
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.widgetTitle}>{title}</Text>
      <View style={styles.widgetValueContainer}>
        <Text style={styles.widgetValue}>{value}</Text>
      </View>
    </View>
  </View>
);

// Composant BankCard
const BankCard = ({ type, last4, holder, expiry, balance, index }) => {
  const getCardGradient = () => {
    const gradients = [
      ['#2D2D2D', '#1A1A1A'],
      ['#1A1A1A', '#0D0D0D'],
      ['#2D2D2D', '#1A1A1A'],
      ['#1A1A1A', '#0D0D0D'],
      ['#2D2D2D', '#1A1A1A'],
    ];
    return gradients[index % gradients.length];
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.card, { backgroundColor: getCardGradient()[0] }]}>
        <View style={styles.decorativeLine} />
        <View style={[styles.decorativeLine, styles.decorativeLineBottom]} />
        
        <View style={styles.cardHeader}>
          <View style={styles.chipContainer}>
            <View style={styles.chip}>
              <View style={styles.chipPattern}>
                <View style={styles.chipLine} />
                <View style={styles.chipLine} />
                <View style={styles.chipLine} />
              </View>
            </View>
          </View>
          <Text style={styles.cardType}>{type.toUpperCase()}</Text>
        </View>

        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>••••</Text>
          <Text style={styles.cardNumber}>••••</Text>
          <Text style={styles.cardNumber}>••••</Text>
          <Text style={[styles.cardNumber, styles.cardNumberLast]}>{last4}</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardLabel}>CARD HOLDER</Text>
            <Text style={styles.cardHolder}>{holder}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardLabel}>EXPIRES</Text>
            <Text style={styles.cardExpiry}>{expiry}</Text>
          </View>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>BALANCE</Text>
          <View style={styles.balanceValueContainer}>
            <Text style={styles.cardBalance}>${balance.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardShadow} />
    </View>
  );
};

export default function Dashboard() {
  const [cards, setCards] = useState(mockCards);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const total = cards.reduce((sum, card) => sum + card.balance, 0);
    setTotalBalance(total);
  }, [cards]);

  return (
    <View style={styles.container}>
      {/* Background avec particules */}
      <ParticleBackground />

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>WELCOME BACK</Text>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>John</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationGradient}>
              <Text style={styles.bellIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCardContainer}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceCardBorder} />
            <View style={styles.patternContainer}>
              {[...Array(8)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.patternLine,
                    {
                      left: `${(i + 1) * 12}%`,
                      backgroundColor: 'rgba(255, 215, 0, 0.05)',
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
            <View style={styles.balanceAmountContainer}>
              <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
            </View>
            <View style={styles.balanceChangeContainer}>
              <Text style={styles.changeIcon}>↗</Text>
              <Text style={styles.balanceChange}>+12.5% from last month</Text>
            </View>
          </View>
        </View>

        {/* Widgets */}
        <View style={styles.widgetsContainer}>
          <Widget
            icon="💰"
            title="INCOME"
            value="$8,420"
            color="#00C853"
            trend={15.2}
          />
          <Widget
            icon="💸"
            title="EXPENSES"
            value="$3,240"
            color="#FF3B30"
            trend={-8.1}
          />
          <Widget
            icon="📊"
            title="SAVINGS"
            value="$5,180"
            color="#FFD700"
            trend={23.5}
          />
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>My Cards</Text>
              </View>
              <View style={styles.sectionUnderline} />
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <View style={styles.seeAllContainer}>
                <Text style={styles.seeAll}>See All</Text>
                <Text style={styles.seeAllIcon}>→</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsListContent}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <BankCard
                type={item.type}
                last4={item.card_number_last4}
                holder={item.card_holder}
                expiry={item.expiry_date}
                balance={item.balance}
                index={index}
              />
            )}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsTitleContainer}>
            <Text style={styles.quickActionsTitle}>QUICK ACTIONS</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            {['Transfer', 'Pay Bills', 'Top Up', 'More'].map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionButton}>
                <View style={styles.quickActionContent}>
                  <Text style={styles.quickActionText}>{action}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
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
  userNameContainer: {
    backgroundColor: '#FFD700',
    marginTop: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  notificationButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  notificationGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellIcon: {
    fontSize: 20,
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
  balanceCardContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  balanceCard: {
    padding: 28,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
  },
  balanceCardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  balanceLabel: {
    fontSize: 11,
    color: '#A0A0A0',
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 12,
  },
  balanceAmountContainer: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -1,
  },
  balanceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changeIcon: {
    color: '#00C853',
    fontSize: 16,
  },
  balanceChange: {
    color: '#00C853',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  patternLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
  },
  widgetsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  widget: {
    flex: 1,
  },
  widgetContent: {
    padding: 16,
    borderRadius: 16,
    position: 'relative',
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
  },
  widgetBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    opacity: 0.3,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 2,
  },
  trendUp: {
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
  },
  trendDown: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
  },
  trendIcon: {
    fontSize: 12,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
  },
  trendUpText: {
    color: '#00C853',
  },
  trendDownText: {
    color: '#FF3B30',
  },
  widgetTitle: {
    fontSize: 11,
    color: '#A0A0A0',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  widgetValueContainer: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  widgetValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  cardsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitleContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  sectionUnderline: {
    height: 3,
    width: 40,
    backgroundColor: '#FFD700',
    marginTop: 4,
    borderRadius: 2,
  },
  seeAllButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  seeAll: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  seeAllIcon: {
    color: '#FFD700',
    fontSize: 14,
  },
  cardsListContent: {
    paddingLeft: 24,
    paddingRight: 20,
  },
  cardWrapper: {
    marginRight: 10,
  },
  card: {
    width: width * 0.85,
    height: 220,
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chipContainer: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  chip: {
    width: 50,
    height: 38,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#FFD700',
  },
  chipPattern: {
    flex: 1,
    justifyContent: 'space-around',
  },
  chipLine: {
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 2,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D0D0D0',
    letterSpacing: 2,
  },
  cardNumberLast: {
    color: '#FFD700',
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfo: {
    gap: 4,
  },
  cardLabel: {
    fontSize: 9,
    color: '#808080',
    letterSpacing: 1,
    fontWeight: '600',
  },
  cardHolder: {
    fontSize: 13,
    color: '#E0E0E0',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardExpiry: {
    fontSize: 13,
    color: '#E0E0E0',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
    alignItems: 'flex-end',
  },
  balanceValueContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardBalance: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  decorativeLine: {
    position: 'absolute',
    left: 0,
    top: '30%',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  decorativeLineBottom: {
    top: '70%',
  },
  cardShadow: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    right: 10,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    opacity: 0.3,
    zIndex: -1,
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
  },
  quickActionsTitleContainer: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 16,
  },
  quickActionsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 1.5,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionContent: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 12,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
  },
  quickActionText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});