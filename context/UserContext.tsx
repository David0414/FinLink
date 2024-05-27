import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const updateUser = (newUserInfo: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserInfo }));
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
