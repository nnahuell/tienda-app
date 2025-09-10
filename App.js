// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useMemo } from 'react';

import StoreNavigator from './src/navigation/shop/StoreNavigator';
import CartNavigator from './src/navigation/cart/CartNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => setCartItems((prev) => [...prev, product]);
  const removeFromCart = (index) =>
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => setCartItems([]);

  // 👇 memoizamos para evitar remounts en cada setState del carrito
  const storeTab = useMemo(
    () => <StoreNavigator addToCart={addToCart} />,
    [addToCart]
  );

  const cartTab = useMemo(
    () => (
      <CartNavigator
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    ),
    [cartItems, removeFromCart, clearCart]
  );

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#f4511e" />
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Tienda" children={() => storeTab} />
        <Tab.Screen name="Carrito" children={() => cartTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});
