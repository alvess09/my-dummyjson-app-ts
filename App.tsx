import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsList from './screens/ProductsList';
import ProductDetail from './screens/ProductDetail';

export type RootStackParamList = {
  Products: undefined;
  Detail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductsList} />
        <Stack.Screen name="Detail" component={ProductDetail} options={{ title: 'Product Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}