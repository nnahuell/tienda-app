import { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permiso denegado", "No se puede acceder a la ubicación.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setCoords(loc.coords);
  };

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text>Ubicación:</Text>
      {coords ? (
        <Text>Lat: {coords.latitude}, Lon: {coords.longitude}</Text>
      ) : (
        <Text>No detectada</Text>
      )}
      <Button title="Detectar ubicación" onPress={getLocation} />
    </View>
  );
}
