import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  description: string;
  image: string;
}

const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products'); // Ajuste a URL conforme necessário
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReviewForm', { productId: item.id })}
      >
        <Text style={styles.buttonText}>Avaliar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2E8B57" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4D58D',
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#2E8B57',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#E07A5F',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default ProductListScreen;
