import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Cart: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>
      {/* Cart items */}
      <View style={styles.cartItem}>
        <Text style={styles.itemName}>Product 1</Text>
        <Text style={styles.itemPrice}>$10</Text>
      </View>
      <View style={styles.cartItem}>
        <Text style={styles.itemName}>Product 2</Text>
        <Text style={styles.itemPrice}>$15</Text>
      </View>
      <View style={styles.cartItem}>
        <Text style={styles.itemName}>Product 3</Text>
        <Text style={styles.itemPrice}>$20</Text>
      </View>
      <View style={styles.cartItem}>
        <Text style={styles.itemName}>Product 4</Text>
        <Text style={styles.itemPrice}>$25</Text>
      </View>
      <View style={styles.cartItem}>
        <Text style={styles.itemName}>Product 5</Text>
        <Text style={styles.itemPrice}>$30</Text>
      </View>
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
