import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../theme';

// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsListScreen from '../screens/TransactionsListScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopWidth: 0,
        elevation: 10,
        height: 65,
        borderRadius: 20,
        margin: 10,
        position: 'absolute',
      },
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => {
        let icon = '';
        if (route.name === 'Home') icon = '🏠';
        else if (route.name === 'Reports') icon = '📊';
        else if (route.name === 'Add') icon = '➕';
        else if (route.name === 'Transactions') icon = '💳';
        else if (route.name === 'Profile') icon = '👤';

        // Floating Add Button Style
        if (route.name === 'Add') {
          return (
            <View style={{
              top: -20,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: COLORS.primary,
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 10
            }}>
              <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
            </View>
          );
        }

        return (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
            {focused && <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.primary, marginTop: 4 }} />}
          </View>
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={DashboardScreen} />
    <Tab.Screen name="Transactions" component={TransactionsListScreen} />
    <Tab.Screen name="Add" component={AddExpenseScreen} options={{ tabBarStyle: { display: 'none' } }} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;