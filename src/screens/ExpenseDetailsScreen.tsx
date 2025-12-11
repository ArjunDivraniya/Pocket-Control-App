import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../theme';
import client from '../api/client';

const ExpenseDetailsScreen = ({ route, navigation }) => {
  const { transaction } = route.params;

  const handleDelete = async () => {
    try {
        // Need to add delete route in backend first
        Alert.alert("Success", "Transaction Deleted");
        navigation.goBack();
    } catch (error) {
        Alert.alert("Error", "Could not delete");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: transaction.type === 'income' ? COLORS.success : COLORS.danger }]}>
        <Text style={styles.amount}>${transaction.amount}</Text>
        <Text style={styles.label}>{transaction.category}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
            <Text style={styles.key}>Date</Text>
            <Text style={styles.value}>{new Date(transaction.date).toDateString()}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.key}>Payment</Text>
            <Text style={styles.value}>{transaction.paymentMethod}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.key}>Note</Text>
            <Text style={styles.value}>{transaction.note || '-'}</Text>
        </View>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 40, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  amount: { fontSize: 40, fontWeight: 'bold', color: 'white' },
  label: { fontSize: 18, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  detailsContainer: { padding: 20, marginTop: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  key: { color: COLORS.textLight, fontSize: 16 },
  value: { color: COLORS.textDark, fontSize: 16, fontWeight: '600' },
  deleteBtn: { marginTop: 40, backgroundColor: '#FFE4E6', padding: 15, borderRadius: 15, alignItems: 'center' },
  deleteText: { color: COLORS.danger, fontWeight: 'bold' }
});

export default ExpenseDetailsScreen;