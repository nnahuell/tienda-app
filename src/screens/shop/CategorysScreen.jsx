import { StyleSheet, Text, Image, FlatList, TouchableOpacity, View } from 'react-native';
import Categories from '../../data/categories.json';
import FlatCard from '../../components/FlatCard';
import { colors } from '../../global/colors';

const CategorysScreen = ({ navigation }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductsScreen', { categoryId: item.title.toLowerCase() })}
    >
      <FlatCard style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode="cover"
          />
        </View>
      </FlatCard>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={Categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingVertical: 4 }}
    />
  );
};

export default CategorysScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // separa título e imagen
    gap: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    maxWidth: '55%',
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
});
