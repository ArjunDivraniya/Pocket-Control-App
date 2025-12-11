import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get screen dimensions for responsive sizing
const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  
  const handleStart = () => {
    // Navigate to Dashboard or Login
    // navigation.replace('Dashboard'); 
    console.log("Navigate to Dashboard");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3E8FF" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#F3E8FF', '#E9D5FF', '#D8B4FE']} // Soft purple gradient
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.contentContainer}>
        
        {/* 1. Illustration Section */}
        <View style={styles.illustrationContainer}>
          {/* PLACEHOLDER: Replace 'require' below with your actual image path.
            Example: require('../../assets/images/wallet_illustration.png') 
          */}
          <View style={styles.imagePlaceholder}>
             <Text style={{fontSize: 80}}>👛💰</Text>
             {/* Use your Image component here: 
             <Image 
                source={require('../../assets/images/wallet.png')} 
                style={styles.image} 
                resizeMode="contain" 
             /> 
             */}
          </View>
        </View>

        {/* 2. Text & Content Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.title}>
            Save your money with{"\n"}
            <Text style={styles.titleHighlight}>Expense Tracker</Text>
          </Text>

          <Text style={styles.description}>
            Track your daily expenses, set monthly budgets, and achieve your financial goals with ease.
          </Text>

          {/* 3. Let's Start Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']} // Deep purple button gradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Let’s Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8FF', // Fallback color
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  illustrationContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'rgba(255,255,255,0.4)', // Glassmorphism placeholder
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    // Shadow for 3D effect
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // Neumorphic Soft Shadow
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
  },
  titleHighlight: {
    color: '#7C3AED', // Purple highlight
  },
  description: {
    fontSize: 15,
    color: '#6B7280', // Cool gray
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    borderRadius: 20,
    // Button Shadow
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;