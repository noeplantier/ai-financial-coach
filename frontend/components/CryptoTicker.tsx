import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface CryptoData {
  id: string;
  name: string;
  price: number;
  change_24h: number;
}

export const CryptoTicker: React.FC = () => {
  const [data, setData] = useState<CryptoData[]>([]);

  useEffect(() => {
    fetchCrypto();
    // Refresh every minute
    const interval = setInterval(fetchCrypto, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCrypto = async () => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/api/crypto/market`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.log("Crypto fetch error", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Watch</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.symbol}>{item.name}</Text>
              {item.change_24h >= 0 ? 
                <TrendingUp size={14} color={Colors.success} /> : 
                <TrendingDown size={14} color={Colors.error} />
              }
            </View>
            <Text style={styles.price}>${item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
            <Text style={[styles.change, { color: item.change_24h >= 0 ? Colors.success : Colors.error }]}>
              {item.change_24h.toFixed(2)}%
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  symbol: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
});
