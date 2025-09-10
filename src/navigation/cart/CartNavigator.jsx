import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../../screens/cart/CartScreen';
import OrderSuccessScreen from '../../screens/cart/OrderSuccessScreen';

const Stack = createNativeStackNavigator();

const CartNavigator = ({ cartItems, removeFromCart, clearCart }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Carrito">
        {(props) => (
          <CartScreen
            {...props}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="OrderSuccess" options={{ title: '¡Listo!' }}>
        {(props) => <OrderSuccessScreen {...props} clearCart={clearCart} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default CartNavigator;
