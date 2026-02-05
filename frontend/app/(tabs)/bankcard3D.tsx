import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { CreditCard, Chip } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface BankCard3DProps {
  type: string;
  last4: string;
  holder: string;
  expiry: string;
  balance: number;
  index: number;
}

export const BankCard3D: React.FC<BankCard3DProps> = ({
  type,
  last4,
  holder,
  expiry,
  balance,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGradientColors = () => {
    if (type === 'visa') {
      return ['#0F0F0F', '#1A1A1A', '#0A0A0A'];
    }
    return ['#1A0000', '#2D0A0A', '#0F0000'];
  };

  return (
    <MotiView
      from={{ opacity: 0, translateX: 50, rotateY: '20deg' }}
      animate={{ opacity: 1, translateX: 0, rotateY: '0deg' }}
      transition={{
        type: 'spring',
        delay: index * 150,
        damping: 20,
      }}
    >
      <Pressable
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <MotiView
          animate={{
            rotateY: isHovered ? '10deg' : '0deg',
            translateY: isHovered ? -10 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 150,
          }}
          style={styles.cardContainer}
        >
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {/* Effet de brillance doré */}
            <LinearGradient
              colors={['rgba(255, 215, 0, 0)', 'rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardShine}
            />

            {/* Header avec logo */}
            <View style={styles.cardHeader}>
              <View style={styles.chipContainer}>
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.chip}
                >
                  <View style={styles.chipPattern}>
                    <View style={styles.chipLine} />
                    <View style={styles.chipLine} />
                  </View>
                </LinearGradient>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.cardType}>{type.toUpperCase()}</Text>
              </View>
            </View>

            {/* Numéro de carte */}
            <View style={styles.cardNumberContainer}>
              <Text style={styles.cardNumber}>••••</Text>
              <Text style={styles.cardNumber}>••••</Text>
              <Text style={styles.cardNumber}>••••</Text>
              <Text style={[styles.cardNumber, styles.cardNumberLast]}>
                {last4}
              </Text>
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
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.balanceGradient}
              >
                <Text style={styles.cardBalance}>
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
              </LinearGradient>
            </View>

            {/* Lignes décoratives dorées */}
            <View style={styles.decorativeLine} />
            <View style={[styles.decorativeLine, styles.decorativeLineBottom]} />
          </LinearGradient>

          {/* Ombre portée dynamique */}
          <MotiView
            animate={{
              opacity: isHovered ? 0.6 : 0.3,
              scale: isHovered ? 1.1 : 1,
            }}
            style={styles.cardShadow}
          />
        </MotiView>
      </Pressable>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 20,
    marginVertical: 10,
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
  cardShine: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
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
  logoContainer: {
    alignItems: 'flex-end',
  },
  cardType: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
  balanceGradient: {
    paddingHorizontal: 2,
    paddingVertical: 1,
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
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
});