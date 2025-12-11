import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../theme';

const ProfileScreen = ({ navigation }) => {
  const { logout, userInfo } = useContext(AuthContext);

  const MenuItem = ({ icon, label, onPress, isDestructive = false }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={[styles.menuLabel, isDestructive && { color: COLORS.danger }]}>{label}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={{fontSize: 40}}>👤</Text>
        </View>
        <Text style={styles.name}>{userInfo?.name || 'Arjun Divraniya'}</Text>
        <Text style={styles.email}>{userInfo?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon="⚙️" label="Settings" onPress={() => navigation.navigate('Settings')} />
        <MenuItem icon="🏷️" label="Manage Categories" onPress={() => navigation.navigate('CategoryManager')} />
        <MenuItem icon="💾" label="Export Data" onPress={() => {}} />
        
        <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>🌙</Text>
            <Text style={styles.menuLabel}>Dark Mode</Text>
            <Switch value={false} trackColor={{false: "#eee", true: COLORS.primary}} />
        </View>

        <MenuItem icon="🚪" label="Logout" onPress={logout} isDestructive />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  header: { alignItems: 'center', marginVertical: 30 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
  email: { fontSize: 14, color: COLORS.textLight },
  menuContainer: { backgroundColor: COLORS.white, borderRadius: 20, padding: 10, ...COLORS.cardShadow },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  menuIcon: { fontSize: 20, marginRight: 15, width: 30, textAlign: 'center' },
  menuLabel: { flex: 1, fontSize: 16, color: COLORS.textDark, fontWeight: '500' },
  arrow: { fontSize: 20, color: COLORS.textLight }
});

export default ProfileScreen;