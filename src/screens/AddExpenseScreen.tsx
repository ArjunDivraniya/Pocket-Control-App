import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import client from '../api/client';
import { COLORS } from '../theme';

const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('expense'); // 'expense' or 'income'
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!amount) return Alert.alert("Error", "Please enter an amount");
    
    setLoading(true);
    try {
      await client.post('/transactions', {
        amount: parseFloat(amount),
        category: type === 'expense' ? 'Shopping' : 'Salary', // Simplified for demo
        type,
        note,
        paymentMethod: 'Cash',
        date: new Date()
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backBtn}>⬅️</Text></TouchableOpacity>
        <Text style={styles.title}>Add Transaction</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Type Switcher */}
      <View style={styles.switchContainer}>
        <TouchableOpacity 
          style={[styles.switchBtn, type === 'expense' && styles.activeSwitchExpense]} 
          onPress={() => setType('expense')}>
          <Text style={[styles.switchText, type === 'expense' && { color: 'white' }]}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.switchBtn, type === 'income' && styles.activeSwitchIncome]} 
          onPress={() => setType('income')}>
          <Text style={[styles.switchText, type === 'income' && { color: 'white' }]}>Income</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currency}>$</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric" 
            placeholder="0.00" 
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <Text style={styles.label}>Note</Text>
        <TextInput 
          style={styles.noteInput} 
          placeholder="What is this for?" 
          value={note}
          onChangeText={setNote}
        />

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} disabled={loading} style={styles.saveBtnContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.saveBtn}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Transaction</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, marginTop: 10 },
  backBtn: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  switchContainer: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 15, padding: 5, marginBottom: 30, elevation: 2 },
  switchBtn: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  activeSwitchExpense: { backgroundColor: COLORS.danger },
  activeSwitchIncome: { backgroundColor: COLORS.success },
  switchText: { fontWeight: '600', color: COLORS.textLight },
  form: { flex: 1 },
  label: { fontSize: 14, color: COLORS.textLight, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 15, marginBottom: 20, elevation: 2 },
  currency: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, marginRight: 10 },
  input: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, flex: 1 },
  noteInput: { backgroundColor: COLORS.white, borderRadius: 20, padding: 20, height: 100, textAlignVertical: 'top', elevation: 2, marginBottom: 30 },
  saveBtnContainer: { marginTop: 'auto', marginBottom: 20 },
  saveBtn: { padding: 18, borderRadius: 20, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default AddExpenseScreen;