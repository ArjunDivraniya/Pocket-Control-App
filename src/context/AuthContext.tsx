import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await client.post('/auth/login', { email, password });
      const { token, ...userData } = res.data;
      
      setUserToken(token);
      setUserInfo(userData);
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    } catch (e) {
      console.log(e);
      alert('Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await client.post('/auth/signup', { name, email, password });
      const { token, ...userData } = res.data;

      setUserToken(token);
      setUserInfo(userData);

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
    } catch (e) {
      console.log(e);
      alert('Signup Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      let userInfo = await AsyncStorage.getItem('userInfo');
      
      if (token) {
        setUserToken(token);
        setUserInfo(userInfo ? JSON.parse(userInfo) : null);
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
    <AuthContext.Provider value={{ login, signup, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};