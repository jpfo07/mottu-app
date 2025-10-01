// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from '../src/context/ThemeContext';
import { UserProvider } from '../src/context/UserContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack /> {/* Expo Router cuida do container de navegação */}
      </UserProvider>
    </ThemeProvider>
  );
}
