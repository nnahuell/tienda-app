import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategorysScreen, ProductsScreen, ProductScreen } from "../../screens";
import SQLiteTestScreen from '../../screens/dev/SQLiteTestScreen';
import LocationScreen from '../../screens/profiles/LocationScreen';
import { TouchableOpacity, Text, View } from 'react-native';

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
      <Stack.Screen
        name="Categorias"
        component={CategorysScreen}
        options={({ navigation }) => ({
          // Botoncitos en el header: DB (SQLite) y Loc (Location)
          headerRight: () => (
            <View style={{ flexDirection:'row', gap:12 }}>
              <TouchableOpacity onPress={() => navigation.navigate('SQLiteTest')}>
                <Text style={{ color:'#fff', fontWeight:'700' }}>DB</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Location')}>
                <Text style={{ color:'#fff', fontWeight:'700' }}>Loc</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductScreen">
        {(props) => <ProductScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>

      {/* Extras para la rúbrica */}
      <Stack.Screen name="SQLiteTest" component={SQLiteTestScreen} options={{ title:'SQLite Test' }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ title:'Ubicación' }} />
    </Stack.Navigator>
  );
};

export default StoreNavigator;
