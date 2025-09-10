// src/screens/cart/OrderSuccessScreen.jsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderSuccessScreen = ({ route, navigation, clearCart }) => {
  const { orderId, total, itemsCount } = route.params || {};
  const clearedRef = useRef(false); // 👈 fusible

  useEffect(() => {
    if (clearedRef.current) return;
    clearedRef.current = true;
    clearCart?.(); // vaciar carrito una única vez
  }, [clearCart]);

  return (
    <View style={styles.container}>
      <Text style={styles.big}>¡Gracias por tu compra!</Text>
      <Text style={styles.sub}>Orden #{orderId}</Text>
      <Text style={{ marginTop: 10 }}>Artículos: {itemsCount}</Text>
      <Text>Total pagado: ${total}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent()?.navigate('Tienda')}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Volver a la tienda</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 8 },
  big: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  sub: { fontSize: 16, color: '#333', marginBottom: 10 },
  btn: {
    marginTop: 16,
    backgroundColor: '#f4511e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
