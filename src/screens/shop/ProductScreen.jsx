import React from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";

const ProductScreen = ({ route, addToCart }) => {
  const { product } = route.params;

  const handleAdd = () => {
    addToCart(product);
    Alert.alert("Agregado", `${product.title} se agregó al carrito.`);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.mainImage }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.longDescription}</Text>

      <Button title="Agregar al carrito" onPress={handleAdd} />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  image: { width: 260, height: 180, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 18, marginVertical: 10 },
  description: { fontSize: 14, textAlign: "center", marginBottom: 20, color: "#444" },
});
