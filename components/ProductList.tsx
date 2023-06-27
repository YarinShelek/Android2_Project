import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';

const products = [
  { id: 1, name: 'Product 1', price: '$10' },
  { id: 2, name: 'Product 2', price: '$15' },
  { id: 3, name: 'Product 3', price: '$20' },
  { id: 4, name: 'Product 4', price: '$25' },
  { id: 5, name: 'Product 5', price: '$30' },
  { id: 6, name: 'Product 6', price: '$35' },
  // Add more products as needed
];

const ProductList: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product) => (
          <Card key={product.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.productName}>{product.name}</Title>
              <Title style={styles.productPrice}>{product.price}</Title>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button mode="contained" style={styles.addButton}>
                Add to Cart
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  card: {
    marginBottom: 10,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  productPrice: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  addButton: {
    backgroundColor: '#1DA1F2', // Light blue color (similar to Twitter)
  },
};

export default ProductList;
