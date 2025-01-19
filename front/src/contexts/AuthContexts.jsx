'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const checkAuth = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:2325/api.php?route=check-auth');

  //     if (response.data.authenticated) {
  //       setUser(response.data.user);
  //     } else {
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const check = () => {
    return user;
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=login', { email, password });

      if (response.data.message === 'Login successful') {
        const userData = jwtDecode(response.data.token);
        setUser(userData.user);

        // if (token) {
        console.log(userData.user); // { id: 1, role: 'etudiant', exp: 1234567890 }
        // }
        document.cookie = `token=${response.data.token}; path=/; max-age=3600`;
        document.cookie = `user=${JSON.stringify(userData.user)}; path=/; max-age=3600`;

        return userData.user;
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || error.message || 'Login failed');
    }
  };
  const signup = async (username, email, password, role) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=signup', {
        username,
        email,
        password,
        role,
      });

      if (response) {
        return response.data;
      } else {
        return response.data.error;
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || error.message || 'Signup failed');
    }
  };

  const logout = async () => {
    try {
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

      setUser(null);

      router.push('/auth/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, check }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
