import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

// Import das telas
import CadastroScreen from '../../app/Auth/cadastro';
import LoginScreen from '../../app/Auth/login';
import AlertasScreen from '../../app/Home/alertas';
import HomeScreen from '../../app/Home/home';
import Index from '../../app/index';
import DetalheMotoScreen from '../../app/Motos/detalhes-moto';
import PatioScreen from '../../app/Patios';
import PerfilScreen from '../../app/Perfil/perfil';


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
