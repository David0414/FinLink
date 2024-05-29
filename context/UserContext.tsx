import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface UserContextProps {
  user: User;
  updateUser: (newUserInfo: Partial<User>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    imageUrl: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      }
    };

    loadUser();
  }, []);

  const updateUser = async (newUserInfo: Partial<User>) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newUserInfo };
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
