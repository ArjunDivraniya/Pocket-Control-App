import React, { useCallback, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import client from '../api/client';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../theme';

const DashboardScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      // 1. Get Dashboard Stats (Balance)
      const resStats = await client.get('/transactions/dashboard');
      setDashboardData(resStats.data);

      // 2. Get Recent Transactions
      const resTrans = await client.get('/transactions');
      setRecentTransactions(resTrans.data.slice(0, 5)); // Show only top 5
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.username}>{userInfo?.name || 'User'}</Text>
          </View>
          <View style={styles.notificationIcon}>
             <Text>🔔</Text>
          </View>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          style={styles.card}
        >
          <Text style={styles.cardLabel}>Total Balance</Text>
          <Text style={styles.balanceText}>${dashboardData.balance.toFixed(2)}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.arrowBg, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Text>⬇️</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={styles.statValue}>${dashboardData.income}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.arrowBg, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Text>⬆️</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Expense</Text>
                <Text style={styles.statValue}>${dashboardData.expense}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Transactions List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text style={styles.seeAll} onPress={() => navigation.navigate('Transactions')}>See All</Text>
        </View>

        {recentTransactions.map((item) => (
          <View key={item._id} style={styles.transactionItem}>
            <View style={styles.iconContainer}>
              <Text style={{ fontSize: 20 }}>{item.category === 'Food' ? '🍔' : '🛍️'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.transTitle}>{item.category}</Text>
              <Text style={styles.transDate}>{new Date(item.date).toDateString()}</Text>
            </View>
            <Text style={[
              styles.transAmount, 
              { color: item.type === 'income' ? COLORS.success : COLORS.danger }
            ]}>
              {item.type === 'income' ? '+' : '-'} ${item.amount}
            </Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 },
  greeting: { color: COLORS.textLight, fontSize: 14 },
  username: { color: COLORS.textDark, fontSize: 22, fontWeight: 'bold' },
  notificationIcon: { padding: 10, backgroundColor: COLORS.white, borderRadius: 50 },
  card: { padding: 25, borderRadius: 25, ...COLORS.cardShadow, marginBottom: 25 },
  cardLabel: { color: COLORS.primaryLight, fontSize: 16 },
  balanceText: { color: COLORS.white, fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statItem: { flexDirection: 'row', alignItems: 'center' },
  arrowBg: { padding: 8, borderRadius: 10, marginRight: 10 },
  statLabel: { color: COLORS.primaryLight, fontSize: 12 },
  statValue: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  seeAll: { color: COLORS.primary, fontWeight: '600' },
  transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 15, borderRadius: 15, marginBottom: 10, elevation: 2 },
  iconContainer: { width: 50, height: 50, backgroundColor: '#F3F4F6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  transTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textDark },
  transDate: { fontSize: 12, color: COLORS.textLight },
  transAmount: { fontSize: 16, fontWeight: 'bold' }
});

export default DashboardScreen;