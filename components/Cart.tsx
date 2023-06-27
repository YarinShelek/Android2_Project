import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const products = [
  { id: 1, name: 'Product 1', price: '$10', description: 'Product 1 description' },
  { id: 2, name: 'Product 2', price: '$15', description: 'Product 2 description' },
  { id: 3, name: 'Product 3', price: '$20', description: 'Product 3 description' },
  { id: 4, name: 'Product 4', price: '$25', description: 'Product 4 description' },
  { id: 5, name: 'Product 5', price: '$30', description: 'Product 5 description' },
];

const Cart: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(products);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>

      {/* Cart items */}
      {cartItems.map((product) => (
        <TouchableOpacity key={product.id} onPress={() => handleProductPress(product)}>
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{product.name}</Text>
            <Text style={styles.itemPrice}>{product.price}</Text>
            <IconButton
              icon={() => <MaterialCommunityIcons name="close" size={20} color="#FF0000" />}
              onPress={() => handleRemoveItem(product.id)}
            />
          </View>
        </TouchableOpacity>
      ))}

      {/* Product Details Modal */}
      <Modal visible={!!selectedProduct} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          {selectedProduct && (
            <>
              <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
              <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
              <Button mode="contained" style={styles.closeButton} onPress={handleModalClose}>
                Close
              </Button>
            </>
          )}
        </View>
      </Modal>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>$110</Text>
      </View>

      {/* Checkout button */}
      <Button mode="contained" style={styles.checkoutButton}>
        Checkout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  modalDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#1DA1F2',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalPrice: {
    fontSize: 18,
    color: '#666666',
  },
  checkoutButton: {
    backgroundColor: '#1DA1F2',
  },
});

export default Cart;
