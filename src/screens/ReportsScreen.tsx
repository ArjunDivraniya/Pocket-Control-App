import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS } from '../theme';

const ReportsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Analytics</Text>
      
      {/* Overview Cards */}
      <View style={styles.row}>
        <View style={[styles.card, { backgroundColor: '#E0E7FF' }]}>
           <Text style={styles.cardLabel}>Total Income</Text>
           <Text style={[styles.cardValue, { color: COLORS.primary }]}>$12,500</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#FFE4E6' }]}>
           <Text style={styles.cardLabel}>Total Expense</Text>
           <Text style={[styles.cardValue, { color: COLORS.danger }]}>$4,200</Text>
        </View>
      </View>

      {/* Chart */}
      <Text style={styles.chartTitle}>Weekly Breakdown</Text>
      <BarChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: [20, 45, 28, 80, 99, 43, 50] }]
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`, // Purple Bars
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ borderRadius: 16, marginVertical: 10 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: COLORS.textDark },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: { width: '48%', padding: 20, borderRadius: 20 },
  cardLabel: { fontSize: 12, color: COLORS.textLight, marginBottom: 5 },
  cardValue: { fontSize: 20, fontWeight: 'bold' },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: COLORS.textDark }
});

export default ReportsScreen;