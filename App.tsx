import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import AppRoutes from './src/routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
