import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../theme/colors';



type ThemeContextType = {
  theme: typeof lightTheme;
  toggleTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('@theme');
      if (storedTheme === 'dark') {
        setIsDark(true);
        setTheme(darkTheme);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark ? darkTheme : lightTheme;
    setIsDark(!isDark);
    setTheme(newTheme);
    await AsyncStorage.setItem('@theme', !isDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
