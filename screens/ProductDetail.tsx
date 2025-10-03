import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchProductById, deleteProduct, Product } from '../api/dummyApi';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function ProductDetail({ route, navigation }: Props) {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchProductById(id);
        if (mounted) setProduct(data);
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
  }, [id]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.center}><Text>Erro: {error}</Text></View>;

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(id);
      Alert.alert('Resposta', JSON.stringify(res));
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: product?.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product?.title}</Text>
      <Text style={styles.brand}>{product?.brand} • {product?.category}</Text>
      <Text style={styles.price}>${product?.price}  •  Rating: {product?.rating}</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product?.description}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Delete (demo)" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 260, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  brand: { color: '#666', marginTop: 6 },
  price: { marginTop: 8, fontWeight: '700' },
  sectionTitle: { marginTop: 12, fontWeight: '700' },
  description: { marginTop: 6, color: '#333' }
});