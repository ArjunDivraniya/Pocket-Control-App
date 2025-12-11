import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { COLORS } from '../theme';

const screenWidth = Dimensions.get("window").width;

const BudgetScreen = () => {
  const data = {
    labels: ["Food", "Transport", "Shop"], // optional
    data: [0.7, 0.4, 0.2] // 70%, 40%, 20%
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Monthly Budget</Text>
      
      <View style={styles.chartContainer}>
        <ProgressChart
          data={data}
          width={screenWidth - 40}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`,
            labelColor: (opacity = 1) => COLORS.textDark,
          }}
          hideLegend={false}
        />
      </View>

      <View style={styles.budgetCard}>
         <Text style={styles.budgetLabel}>Remaining Budget</Text>
         <Text style={styles.budgetValue}>$1,240.00</Text>
         <Text style={styles.budgetSub}>of $2,000.00 limit</Text>
      </View>

      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      {/* List of progress bars would go here */}
      <View style={styles.catItem}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
            <Text style={styles.catName}>Food & Dining</Text>
            <Text style={styles.catPercent}>70%</Text>
        </View>
        <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '70%', backgroundColor: COLORS.secondary }]} />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: COLORS.textDark },
  chartContainer: { alignItems: 'center', marginBottom: 20 },
  budgetCard: { backgroundColor: COLORS.primary, borderRadius: 20, padding: 25, alignItems: 'center', marginBottom: 30, ...COLORS.cardShadow },
  budgetLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 5 },
  budgetValue: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  budgetSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: COLORS.textDark },
  catItem: { backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 10 },
  catName: { fontWeight: '600', color: COLORS.textDark },
  catPercent: { fontWeight: '600', color: COLORS.textLight },
  progressBarBg: { height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, marginTop: 5 },
  progressBarFill: { height: 8, borderRadius: 4 }
});

export default BudgetScreen;