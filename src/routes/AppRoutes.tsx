import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

// Import das telas
import CadastroScreen from '../screens/Auth/cadastro';
import LoginScreen from '../screens/Auth/login';
import Index from '../screens/Home';
import AlertasScreen from '../screens/Home/alertas';
import HomeScreen from '../screens/Home/home';
import DetalheMotoScreen from '../screens/Motos/detalhes-moto';
import PatioScreen from '../screens/Patios';
import PerfilScreen from '../screens/Perfil/perfil';


const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Usuário logado
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="DetalheMoto" component={DetalheMotoScreen} />
            <Stack.Screen name="Patio" component={PatioScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Alertas" component={AlertasScreen} />
          </>
        ) : (
          // Usuário não logado
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
