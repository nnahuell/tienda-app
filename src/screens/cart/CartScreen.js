import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const CartScreen = ({ cartItems = [], removeFromCart, clearCart, navigation }) => {
  const total = cartItems.reduce((acc, p) => acc + (p.price || 0), 0);

  const finalizarCompra = () => {
    const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
    navigation.navigate('OrderSuccess', {
      orderId,
      total,
      itemsCount: cartItems.length,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>No hay productos en el carrito.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{ paddingBottom: 12 }}
            renderItem={({ item, index }) => (
              <View style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(index)}>
                  <Text style={{ color: '#fff' }}>Quitar</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total}</Text>

            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Vaciar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryBtn} onPress={finalizarCompra}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Finalizar compra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  empty: { marginTop: 20, textAlign: 'center', color: '#666' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginVertical: 6,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemPrice: { color: '#333', marginTop: 2 },
  removeBtn: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  footer: { marginTop: 12, gap: 10 },
  total: { fontSize: 18, fontWeight: '700' },
  footerButtons: { flexDirection: 'row', gap: 10 },
  clearBtn: {
    backgroundColor: '#555',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  primaryBtn: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
});
