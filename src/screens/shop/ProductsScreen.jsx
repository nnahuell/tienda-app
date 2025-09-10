import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import products from "../../data/products.json";

const ProductsScreen = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const filteredProducts = products.filter((p) => p.category.toLowerCase() === categoryId);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductScreen", { product: item })}
    >
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos en esta categoría</Text>}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  card: {
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 14, color: "#333" },
  empty: { textAlign: "center", marginTop: 30, color: "#666" }
});
