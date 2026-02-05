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
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        {trend !== undefined && (
          <View style={[styles.trendBadge, trend >= 0 ? styles.trendUp : styles.trendDown]}>
            <Text style={styles.trendIcon}>{trend >= 0 ? '↗' : '↘'}</Text>
            <Text style={[styles.trendText, trend >= 0 ? styles.trendUpText : styles.trendDownText]}>
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
    return type === 'visa' ? '#0F0F0F' : '#1A0000';
  };

  return (
    <View style={[styles.cardWrapper, { marginLeft: index === 0 ? 20 : 10 }]}>
      <View style={[styles.card, { backgroundColor: getCardGradient() }]}>
        {/* Header avec logo */}
        <View style={styles.cardHeader}>
          <View style={styles.chipContainer}>
            <View style={styles.chip}>
              <View style={styles.chipPattern}>
                <View style={styles.chipLine} />
                <View style={styles.chipLine} />
              </View>
            </View>
          </View>
          <Text style={styles.cardType}>{type.toUpperCase()}</Text>
        </View>

        {/* Numéro de carte */}
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>••••</Text>
          <Text style={styles.cardNumber}>••••</Text>
          <Text style={styles.cardNumber}>••••</Text>
          <Text style={[styles.cardNumber, styles.cardNumberLast]}>{last4}</Text>
        </View>

        {/* Footer avec infos */}
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

        {/* Balance en position absolue */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>BALANCE</Text>
          <View style={styles.balanceValueContainer}>
            <Text style={styles.cardBalance}>
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        {/* Lignes décoratives dorées */}
        <View style={styles.decorativeLine} />
        <View style={[styles.decorativeLine, styles.decorativeLineBottom]} />
        
        {/* Shadow effet */}
        <View style={styles.cardShadow} />
      </View>
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
      <View style={styles.backgroundContainer}>
        <View style={styles.gradientBackground}>
          {[...Array(20)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>John Doe</Text>
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

            <Text style={styles.balanceLabel}>TOTAL PORTFOLIO VALUE</Text>
            
            <View style={styles.balanceAmountContainer}>
              <Text style={styles.balanceAmount}>
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>

            <View style={styles.balanceChangeContainer}>
              <Text style={styles.changeIcon}>↗</Text>
              <Text style={styles.balanceChange}>+2.5% from last month</Text>
            </View>

            {/* Pattern décoratif */}
            <View style={styles.patternContainer}>
              {[...Array(3)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.patternLine, 
                    { 
                      left: `${25 + i * 25}%`, 
                      opacity: 0.1 - i * 0.02,
                      backgroundColor: '#FFD700'
                    }
                  ]} 
                />
              ))}
            </View>
          </View>
        </View>

        {/* Widgets Grid */}
        <View style={styles.widgetsContainer}>
          <Widget 
            icon="💰"
            title="Total Expenses" 
            value="$2,847" 
            color="#FFD700" 
            trend={-5.2}
          />
          <Widget 
            icon="📈"
            title="Monthly Income" 
            value="$8,240" 
            color="#00C853" 
            trend={12.5}
          />
          <Widget 
            icon="🎯"
            title="Savings Goal" 
            value="85%" 
            color="#2196F3" 
            trend={8.3}
          />
        </View>

        {/* Bank Cards Section */}
        <View style={styles.cardsSection}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>My Wallets</Text>
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
            horizontal
            data={cards}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
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
            contentContainerStyle={styles.cardsListContent}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActionsTitleContainer}>
            <Text style={styles.quickActionsTitle}>QUICK ACTIONS</Text>
          </View>

          <View style={styles.quickActionsGrid}>
            {['Transfer', 'Deposit', 'Withdraw', 'Analytics'].map((action, index) => (
              <TouchableOpacity key={action} style={styles.quickActionButton}>
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
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFD700',
    opacity: 0.5,
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
  balanceLabel: {
    fontSize: 9,
    color: '#808080',
    letterSpacing: 1,
    fontWeight: '600',
    marginBottom: 4,
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