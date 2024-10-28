import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './src/screens/ProductListScreen';
import ReviewFormScreen from './src/screens/ReviewFormScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Produtos' }} />
        <Stack.Screen name="ReviewForm" component={ReviewFormScreen} options={{ title: 'Avaliar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
