import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { ParticleBackground } from '../../components/ParticleBackground';
import { GradientText } from '../../components/GradientText';
import { ThemedCard } from '../../components/ThemedCard';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

export default function Transactions() {
  const insets = useSafeAreaInsets();
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTx, setNewTx] = useState({ title: '', amount: '', type: 'expense', category: '' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/transactions/`);
      const data = await res.json();
      setTransactions(data);
    } catch (e) {
      console.error(e);
    }
  };

  const addTransaction = async () => {
    if (!newTx.title || !newTx.amount) return;
    try {
      await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/api/transactions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTx,
          amount: parseFloat(newTx.amount)
        })
      });
      setModalVisible(false);
      setNewTx({ title: '', amount: '', type: 'expense', category: '' });
      fetchTransactions();
    } catch (e) {
      Alert.alert("Error", "Could not save transaction");
    }
  };

  const renderItem = ({ item }) => (
    <ThemedCard style={styles.txCard}>
      <View style={styles.iconBox}>
        {item.type === 'income' ? 
          <ArrowDownLeft color={Colors.success} size={20} /> : 
          <ArrowUpRight color={Colors.error} size={20} />
        }
      </View>
      <View style={styles.txInfo}>
        <Text style={styles.txTitle}>{item.title}</Text>
        <Text style={styles.txDate}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={[styles.txAmount, { color: item.type === 'income' ? Colors.success : Colors.text }]}>
        {item.type === 'income' ? '+' : '-'}${item.amount}
      </Text>
    </ThemedCard>
  );

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <GradientText style={styles.title}>Transactions</GradientText>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Plus color={Colors.background} size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet.</Text>
        }
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Transaction</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color={Colors.text} size={24} />
              </TouchableOpacity>
            </View>
            
            <TextInput 
              style={styles.input} 
              placeholder="Title (e.g. Grocery)" 
              placeholderTextColor={Colors.textSecondary}
              value={newTx.title}
              onChangeText={t => setNewTx({...newTx, title: t})}
            />
             <TextInput 
              style={styles.input} 
              placeholder="Amount (e.g. 50)" 
              placeholderTextColor={Colors.textSecondary}
              keyboardType="numeric"
              value={newTx.amount}
              onChangeText={t => setNewTx({...newTx, amount: t})}
            />
            
            <View style={styles.typeRow}>
               <TouchableOpacity 
                style={[styles.typeBtn, newTx.type === 'expense' && styles.typeBtnActive]}
                onPress={() => setNewTx({...newTx, type: 'expense'})}
               >
                 <Text style={[styles.typeText, newTx.type === 'expense' && styles.typeTextActive]}>Expense</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                style={[styles.typeBtn, newTx.type === 'income' && styles.typeBtnActive]}
                onPress={() => setNewTx({...newTx, type: 'income'})}
               >
                 <Text style={[styles.typeText, newTx.type === 'income' && styles.typeTextActive]}>Income</Text>
               </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={addTransaction}>
              <Text style={styles.saveBtnText}>Save Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  txDate: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    padding: 16,
    borderRadius: 12,
    color: Colors.text,
    marginBottom: 16,
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  typeBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    marginHorizontal: 4,
  },
  typeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeText: {
    color: Colors.textSecondary,
  },
  typeTextActive: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
