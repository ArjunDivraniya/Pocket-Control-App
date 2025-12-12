import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Track Your Daily Expenses Easily',
    subtitle: 'Manage your money with a simple and beautiful interface.',
    emoji: '👛',
    coin_emoji: '💰',
    gradient: ['#F3E8FF', '#E9D5FF', '#D8B4FE'],
  },
  {
    id: 2,
    title: 'Understand Your Spending',
    subtitle: 'Visual charts show where your money goes every week.',
    emoji: '📊',
    gradient: ['#F8F5FF', '#F3E8FF', '#E9D5FF'],
  },
  {
    id: 3,
    title: 'Track Cash and UPI in One Place',
    subtitle: 'Never lose track of your offline or digital spending.',
    emoji: '💳',
    coin_emoji: '📱',
    gradient: ['#F3E8FF', '#E9D5FF', '#D8B4FE'],
  },
  {
    id: 4,
    title: 'Stay Within Your Budget',
    subtitle: 'Set monthly limits and avoid overspending.',
    emoji: '📈',
    gradient: ['#F8F5FF', '#F3E8FF', '#E9D5FF'],
  },
];

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    navigation.replace('Signup');
  };

  const slide = SLIDES[currentSlide];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={slide.gradient[0]} />

      <LinearGradient
        colors={slide.gradient}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.contentContainer}>
        {/* Skip Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.replace('Signup')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Slide Content */}
        <View style={styles.slideContainer}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.floatingEmoji}>
              <Text style={styles.emoji}>{slide.emoji}</Text>
            </View>
            {slide.coin_emoji && (
              <View style={styles.floatingCoin}>
                <Text style={styles.coinEmoji}>{slide.coin_emoji}</Text>
              </View>
            )}
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        </View>

        {/* Step Indicator */}
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentSlide && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentSlide > 0 && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handlePrev}>
              <Text style={styles.secondaryButtonText}>← Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={currentSlide === SLIDES.length - 1 ? handleGetStarted : handleNext}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {currentSlide === SLIDES.length - 1 ? "Let's Start" : 'Next →'}
              </Text>
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
    backgroundColor: '#F3E8FF',
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 16,
  },
  skipText: {
    fontSize: 16,
    color: '#7B61FF',
    fontWeight: '600',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  floatingEmoji: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 120,
    marginBottom: 10,
  },
  floatingCoin: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  coinEmoji: {
    fontSize: 50,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 30,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  activeIndicator: {
    width: 24,
    backgroundColor: '#8B5CF6',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(123, 97, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: '#8B5CF6',
  },
  secondaryButtonText: {
    color: '#7B61FF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
