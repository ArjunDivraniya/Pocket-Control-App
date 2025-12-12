import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login with:', { email });
      const res = await client.post('/auth/login', { email, password });
      console.log('Login response:', res.data);
      
      const { token, ...userData } = res.data;
      
      setUserToken(token);
      setUserInfo(userData);
      setOnboardingComplete(true);
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await AsyncStorage.setItem('onboardingComplete', 'true');
    } catch (e: any) {
      console.error('Login error details:', e.response?.data || e.message || e);
      const errorMessage = e.response?.data?.message || e.message || 'Login Failed. Please check your credentials.';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting signup with:', { name, email });
      const res = await client.post('/auth/signup', { name, email, password });
      console.log('Signup response:', res.data);
      
      const { token, ...userData } = res.data;

      setUserToken(token);
      setUserInfo(userData);
      setOnboardingComplete(true);

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await AsyncStorage.setItem('onboardingComplete', 'true');
    } catch (e: any) {
      console.error('Signup error details:', e.response?.data || e.message || e);
      const errorMessage = e.response?.data?.message || e.message || 'Signup Failed. Please try again.';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setOnboardingComplete(false);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('onboardingComplete');
    setIsLoading(false);
  };

  const completeOnboarding = async () => {
    setOnboardingComplete(true);
    await AsyncStorage.setItem('onboardingComplete', 'true');
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      let userInfo = await AsyncStorage.getItem('userInfo');
      let onboarding = await AsyncStorage.getItem('onboardingComplete');
      
      if (token) {
        setUserToken(token);
        setUserInfo(userInfo ? JSON.parse(userInfo) : null);
      }
      
      if (onboarding === 'true') {
        setOnboardingComplete(true);
      }
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, signup, logout, completeOnboarding, isLoading, userToken, userInfo, onboardingComplete }}>
      {children}
    </AuthContext.Provider>
  );
};