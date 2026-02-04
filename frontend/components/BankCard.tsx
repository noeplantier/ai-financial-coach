import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { CreditCard as CardIcon, Wifi } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

interface BankCardProps {
  type: string;
  last4: string;
  holder: string;
  expiry: string;
  balance: number;
  theme: 'gold' | 'black' | 'blue' | string;
}

export const BankCard: React.FC<BankCardProps> = ({ type, last4, holder, expiry, balance, theme }) => {
  
  const getGradientColors = () => {
    switch (theme) {
      case 'gold':
        return ['#FFD700', '#FDB931', '#B8860B'];
      case 'black':
        return ['#2C2C2C', '#1E1E1E', '#000000'];
      case 'blue':
        return ['#1E3A8A', '#2563EB', '#60A5FA'];
      default:
        return Colors.goldGradient;
    }
  };

  const getTextColor = () => {
    return theme === 'gold' ? '#000' : '#FFF';
  };

  const textColor = getTextColor();

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <CardIcon color={textColor} size={24} />
        <Text style={[styles.bankName, { color: textColor }]}>Universal Bank</Text>
        <Wifi color={textColor} size={24} />
      </View>

      <View style={styles.chipRow}>
        <View style={styles.chip} />
        <Text style={[styles.contactless, { color: textColor }]}>Contactless</Text>
      </View>

      <Text style={[styles.cardNumber, { color: textColor }]}>
        **** **** **** {last4}
      </Text>

      <View style={styles.bottomRow}>
        <View>
          <Text style={[styles.label, { color: textColor, opacity: 0.8 }]}>Card Holder</Text>
          <Text style={[styles.value, { color: textColor }]}>{holder.toUpperCase()}</Text>
        </View>
        <View>
          <Text style={[styles.label, { color: textColor, opacity: 0.8 }]}>Expires</Text>
          <Text style={[styles.value, { color: textColor }]}>{expiry}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  chip: {
    width: 45,
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#999',
  },
  contactless: {
    fontSize: 10,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
