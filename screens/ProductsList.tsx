import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchProducts, Product } from '../api/dummyApi';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

export default function ProductsList({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchProducts(30, 0);
        if (mounted) setProducts(data.products);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.center}><Text>Erro: {error}</Text></View>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, elevation: 2 },
  thumb: { width: 90, height: 90, borderRadius: 6, marginRight: 10 },
  title: { fontWeight: '700' },
  desc: { color: '#555', marginTop: 4 },
  price: { marginTop: 8, fontWeight: '600' }
});