import React, { createContext, ReactNode, useState } from 'react';

export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    setUser(null);
    // Aqui você pode limpar tokens ou dados do AsyncStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
