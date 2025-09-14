import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { initDB, insertTest, getAllTests, clearTests, resetTestTable } from '../../services/db';
import { Platform } from 'react-native';

export default function SQLiteTestScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isWeb = Platform.OS === 'web';

  const load = useCallback(async () => {
    if (isWeb) { setItems([]); setLoading(false); return; }
    try {
      setLoading(true);
      await initDB();
      const rows = await getAllTests();
      setItems(rows);
    } catch (e) {
      console.log('load error:', e);
    } finally {
      setLoading(false);
    }
  }, [isWeb]);

  useEffect(() => { load(); }, [load]);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleAdd = async () => {
    try {
      await insertTest('Hola ' + new Date().toLocaleTimeString());
      await load();
    } catch (e) {
      console.log('insert error:', e);
    }
  };

  const handleClear = async () => {
    await clearTests();
    await load();
  };

  const handleReset = async () => {
    await resetTestTable();
    await load();
  };

  if (isWeb) {
    return (
      <View style={{ padding: 16 }}>
        <Text>SQLite no está disponible en Web. Probalo en dispositivo/emulador.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, padding:16, gap:8 }}>
      <Button title="Agregar registro de prueba" onPress={handleAdd} />
      <Button title="Borrar todos los registros" onPress={handleClear} />
      <Button title="Reiniciar tabla (DROP + CREATE)" onPress={handleReset} />

      <Text style={{ marginVertical: 12, fontWeight: 'bold' }}>
        Registros: {items.length}
      </Text>

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={{ paddingVertical:8, borderBottomWidth:0.5 }}>
              <Text>#{item.id} - {item.value}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No hay registros.</Text>}
          onRefresh={load}
          refreshing={loading}
        />
      )}
    </View>
  );
}
