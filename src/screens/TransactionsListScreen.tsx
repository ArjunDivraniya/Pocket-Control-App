import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import client from '../api/client';
import { COLORS } from '../theme';

const TransactionsListScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch all transactions
    client.get('/transactions').then(res => setTransactions(res.data)).catch(err => console.log(err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('ExpenseDetails', { transaction: item })}
    >
      <View style={styles.iconBox}><Text style={{fontSize: 24}}>{item.category === 'Food' ? '🍔' : '🛍️'}</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.category}</Text>
        <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
      </View>
      <Text style={[styles.amount, { color: item.type === 'income' ? COLORS.success : COLORS.danger }]}>
        {item.type === 'income' ? '+' : '-'} ${item.amount}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput 
          placeholder="Search transactions..." 
          style={styles.searchInput} 
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {['All', 'Today', 'Week', 'Month'].map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterChip, filter === f && styles.activeChip]}>
            <Text style={[styles.filterText, filter === f && { color: 'white' }]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList 
        data={transactions.filter(t => t.category.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { marginBottom: 15, marginTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 15, height: 50, marginBottom: 20, elevation: 2 },
  searchIcon: { marginRight: 10, fontSize: 18 },
  searchInput: { flex: 1, fontSize: 16 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EEE' },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { color: COLORS.textLight, fontWeight: '600' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 15, borderRadius: 15, marginBottom: 12, elevation: 2 },
  iconBox: { width: 50, height: 50, backgroundColor: '#F3F4F6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.textDark },
  date: { fontSize: 12, color: COLORS.textLight },
  amount: { fontSize: 16, fontWeight: 'bold' }
});

export default TransactionsListScreen;