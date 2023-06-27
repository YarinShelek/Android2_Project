import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';

const products = [
  { id: 1, name: 'Product 1', price: '$10', description: 'Product 1 description' },
  { id: 2, name: 'Product 2', price: '$15', description: 'Product 2 description' },
  { id: 3, name: 'Product 3', price: '$20', description: 'Product 3 description' },
  { id: 4, name: 'Product 4', price: '$25', description: 'Product 4 description' },
  { id: 5, name: 'Product 5', price: '$30', description: 'Product 5 description' },
  { id: 6, name: 'Product 6', price: '$35', description: 'Product 6 description' },
];

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product) => (
          <TouchableOpacity key={product.id} onPress={() => handleProductPress(product)}>
            <Card style={styles.card}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={selectedProduct !== null} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          {selectedProduct && (
            <View style={styles.modalContent}>
              <Text style={styles.title}>{selectedProduct.name}</Text>
              <Text style={styles.price}>{selectedProduct.price}</Text>
              <Text style={styles.description}>{selectedProduct.description}</Text>
              <Button mode="contained" onPress={handleCloseModal} style={styles.closeButton}>
                Close
              </Button>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#1DA1F2', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    width: '80%', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#1DA1F2',
  },
});

export default ProductList;
