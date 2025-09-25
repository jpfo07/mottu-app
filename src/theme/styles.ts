import { StyleSheet } from 'react-native';
import { lightTheme } from './colors';

export const globalStyles = (theme = lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    text: {
      color: theme.text,
      fontSize: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
    },
    button: {
      backgroundColor: theme.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
