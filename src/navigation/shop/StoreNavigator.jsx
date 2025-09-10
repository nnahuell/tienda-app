import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategorysScreen, ProductsScreen, ProductScreen } from '../../screens';

const Stack = createNativeStackNavigator();

const StoreNavigator = ({ addToCart }) => {
  return (
    <Stack.Navigator
      initialRouteName="Categorias"
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Categorias" component={CategorysScreen} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductScreen">
        {(props) => <ProductScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StoreNavigator;
