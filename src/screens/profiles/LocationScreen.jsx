import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Necesitamos permiso de ubicación.');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setCoords(loc.coords);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación de entrega</Text>
      <Text style={{ marginBottom: 10 }}>
        {coords ? `Lat: ${coords.latitude.toFixed(5)}  Lon: ${coords.longitude.toFixed(5)}` : 'No detectada'}
      </Text>
      <TouchableOpacity style={styles.btn} onPress={getLocation}>
        <Text style={{ color:'#fff', fontWeight:'700' }}>Detectar mi ubicación</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  title:{ fontSize:20, fontWeight:'800', marginBottom:8 },
  btn:{ backgroundColor:'#f4511e', paddingHorizontal:16, paddingVertical:12, borderRadius:10 },
});
