import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTx, setNewTx] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    description: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8081'}/api/transactions/`);
      const data = await res.json();
      setTransactions(data);
    } catch (e) {
      console.error(e);
    }
  };

  const addTransaction = async () => {
    if (!newTx.title || !newTx.amount) {
      Alert.alert('Error', 'Please fill in title and amount');
      return;
    }
    try {
      await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8081'}/api/transactions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTx,
          amount: parseFloat(newTx.amount),
          date: new Date().toISOString(),
        }),
      });
      setModalVisible(false);
      setNewTx({ title: '', amount: '', type: 'expense', category: '', description: '' });
      fetchTransactions();
    } catch (e) {
      Alert.alert('Error', 'Could not save transaction');
    }
  };

  const deleteTransaction = async (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8081'}/api/transactions/${id}`, {
                method: 'DELETE',
              });
              setDetailModalVisible(false);
              fetchTransactions();
            } catch (e) {
              Alert.alert('Error', 'Could not delete transaction');
            }
          },
        },
      ]
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍔',
      transport: '🚗',
      shopping: '🛍️',
      entertainment: '🎬',
      bills: '💡',
      health: '🏥',
      salary: '💰',
      investment: '📈',
      other: '📝',
    };
    return icons[category?.toLowerCase()] || '💳';
  };

  const getTotalIncome = () => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpense = () => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.txCard}
      onPress={() => {
        setSelectedTransaction(item);
        setDetailModalVisible(true);
      }}
    >
      <View style={styles.txCardContent}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor:
                item.type === 'income'
                  ? 'rgba(0, 200, 83, 0.2)'
                  : 'rgba(255, 215, 0, 0.2)',
            },
          ]}
        >
          <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
        </View>

        <View style={styles.txInfo}>
          <Text style={styles.txTitle}>{item.title}</Text>
          <View style={styles.txMeta}>
            <Text style={styles.txCategory}>{item.category || 'Other'}</Text>
            <Text style={styles.txDate}>
              {new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.txRight}>
          <Text
            style={[
              styles.txAmount,
              { color: item.type === 'income' ? '#00C853' : '#FFD700' },
            ]}
          >
            {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
          </Text>
          <View
            style={[
              styles.txTypeBadge,
              {
                backgroundColor:
                  item.type === 'income'
                    ? 'rgba(0, 200, 83, 0.15)'
                    : 'rgba(255, 215, 0, 0.15)',
              },
            ]}
          >
            <Text
              style={[
                styles.txTypeText,
                { color: item.type === 'income' ? '#00C853' : '#FFD700' },
              ]}
            >
              {item.type === 'income' ? '↗' : '↘'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Background avec particules */}
      <View style={styles.backgroundContainer}>
        <View style={styles.gradientBackground}>
          {[...Array(15)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Transactions</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Income</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>
              ${getTotalIncome().toFixed(2)}
            </Text>
          </View>
          <Text style={styles.statIcon}>↗</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Expense</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>
              ${getTotalExpense().toFixed(2)}
            </Text>
          </View>
          <Text style={styles.statIcon}>↘</Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💸</Text>
            <Text style={styles.emptyText}>No transactions yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to add your first transaction
            </Text>
          </View>
        }
      />

      {/* Modal Ajout Transaction */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>New Transaction</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.input}
                placeholder="Title (e.g. Grocery Shopping)"
                placeholderTextColor="#666"
                value={newTx.title}
                onChangeText={(t) => setNewTx({ ...newTx, title: t })}
              />

              <TextInput
                style={styles.input}
                placeholder="Amount (e.g. 50.00)"
                placeholderTextColor="#666"
                keyboardType="decimal-pad"
                value={newTx.amount}
                onChangeText={(t) => setNewTx({ ...newTx, amount: t })}
              />

              <TextInput
                style={styles.input}
                placeholder="Category (e.g. Food, Transport)"
                placeholderTextColor="#666"
                value={newTx.category}
                onChangeText={(t) => setNewTx({ ...newTx, category: t })}
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description (optional)"
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
                value={newTx.description}
                onChangeText={(t) => setNewTx({ ...newTx, description: t })}
              />

              <Text style={styles.typeLabel}>Transaction Type</Text>
              <View style={styles.typeRow}>
                <TouchableOpacity
                  style={[
                    styles.typeBtn,
                    newTx.type === 'expense' && styles.typeBtnActiveExpense,
                  ]}
                  onPress={() => setNewTx({ ...newTx, type: 'expense' })}
                >
                  <Text style={styles.typeIcon}>↘</Text>
                  <Text
                    style={[
                      styles.typeText,
                      newTx.type === 'expense' && styles.typeTextActive,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeBtn,
                    newTx.type === 'income' && styles.typeBtnActiveIncome,
                  ]}
                  onPress={() => setNewTx({ ...newTx, type: 'income' })}
                >
                  <Text style={styles.typeIcon}>↗</Text>
                  <Text
                    style={[
                      styles.typeText,
                      newTx.type === 'income' && styles.typeTextActive,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={addTransaction}>
                <Text style={styles.saveBtnText}>Save Transaction</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal Détail Transaction */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTransaction && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>Transaction Details</Text>
                  </View>
                  <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.detailContent}>
                  {/* Icon & Type */}
                  <View style={styles.detailHeader}>
                    <View
                      style={[
                        styles.detailIconBox,
                        {
                          backgroundColor:
                            selectedTransaction.type === 'income'
                              ? 'rgba(0, 200, 83, 0.2)'
                              : 'rgba(255, 215, 0, 0.2)',
                        },
                      ]}
                    >
                      <Text style={styles.detailCategoryIcon}>
                        {getCategoryIcon(selectedTransaction.category)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.detailTypeBadge,
                        {
                          backgroundColor:
                            selectedTransaction.type === 'income'
                              ? 'rgba(0, 200, 83, 0.15)'
                              : 'rgba(255, 215, 0, 0.15)',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.detailTypeText,
                          {
                            color:
                              selectedTransaction.type === 'income'
                                ? '#00C853'
                                : '#FFD700',
                          },
                        ]}
                      >
                        {selectedTransaction.type === 'income' ? 'Income' : 'Expense'}
                      </Text>
                    </View>
                  </View>

                  {/* Amount */}
                  <View style={styles.detailAmountContainer}>
                    <Text
                      style={[
                        styles.detailAmount,
                        {
                          color:
                            selectedTransaction.type === 'income'
                              ? '#00C853'
                              : '#FFD700',
                        },
                      ]}
                    >
                      {selectedTransaction.type === 'income' ? '+' : '-'}$
                      {selectedTransaction.amount.toFixed(2)}
                    </Text>
                  </View>

                  {/* Details */}
                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Title</Text>
                      <Text style={styles.detailValue}>
                        {selectedTransaction.title}
                      </Text>
                    </View>

                    <View style={styles.detailDivider} />

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Category</Text>
                      <Text style={styles.detailValue}>
                        {selectedTransaction.category || 'Other'}
                      </Text>
                    </View>

                    <View style={styles.detailDivider} />

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>
                        {new Date(selectedTransaction.date).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Text>
                    </View>

                    {selectedTransaction.description && (
                      <>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Description</Text>
                          <Text style={styles.detailValue}>
                            {selectedTransaction.description}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>

                  {/* Delete Button */}
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteTransaction(selectedTransaction._id)}
                  >
                    <Text style={styles.deleteBtnText}>🗑️ Delete Transaction</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#FFD700',
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  titleContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: '#FFD700',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  addIcon: {
    fontSize: 28,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    position: 'relative',
  },
  statLabel: {
    fontSize: 11,
    color: '#A0A0A0',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statValueContainer: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  statIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 24,
    opacity: 0.3,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  txCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
    overflow: 'hidden',
  },
  txCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  txMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  txCategory: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  txDate: {
    color: '#666',
    fontSize: 12,
  },
  txRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  txAmount: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  txTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  txTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitleContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  closeIcon: {
    fontSize: 28,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    padding: 16,
    borderRadius: 12,
    color: '#E0E0E0',
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: 1,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeBtn: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    backgroundColor: 'rgba(45, 45, 45, 0.6)',
    gap: 4,
  },
  typeBtnActiveExpense: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  typeBtnActiveIncome: {
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
    borderColor: '#00C853',
  },
  typeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  typeText: {
    color: '#A0A0A0',
    fontWeight: '600',
    fontSize: 14,
  },
  typeTextActive: {
    color: '#E0E0E0',
    fontWeight: '800',
  },
  saveBtn: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#1A1A1A',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  detailContent: {
    paddingBottom: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailCategoryIcon: {
    fontSize: 32,
  },
  detailTypeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  detailTypeText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailAmountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  detailAmount: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  detailSection: {
    backgroundColor: 'rgba(45, 45, 45, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  detailRow: {
    paddingVertical: 12,
  },
  detailLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  detailValue: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  detailDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  deleteBtn: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  deleteBtnText: {
    color: '#FF3B30',
    fontWeight: '700',
    fontSize: 16,
  },
});