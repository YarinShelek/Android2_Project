import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { setUserData, getSavedUser, cartExists } from "../utils/utils";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

interface CartProps {
  data: string;
}

const Cart: React.FC<CartProps> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  console.log(`Data inside of Cart: ${data}`);

  const fixUrlString = (url: string, data: string) => {
    const addition = data.replace(/"/g, "");
    const fixedUrl = url + addition;
    return fixedUrl;
  };

  
  const createUserCart = async () => {
    try{
      console.log(`createUserCart`);
      const url = "https://ksp2.onrender.com/carts/createCart?username=";
      const fixedUrl = fixUrlString(url, data);
      const responseCreate = await axios.post(fixedUrl);
      const dataCart = await responseCreate.data;
      setCartItems(responseCreate.data);
      return dataCart;
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      console.log(`Fetching Cart`);
      const getCurrentUser = async () => {
        const url = "https://ksp2.onrender.com/users?username=";
        const fixedUrl = fixUrlString(url, data);
        const responseUser = await axios.get(fixedUrl);
        const dataUser = await responseUser.data;
        if (dataUser?.cart !== undefined) {
          console.log("dateUser != undefined")
          console.log(dataUser);
        }else{
          const currentCart = await Promise.resolve(createUserCart());
          currentCart[0]!.username = dataUser!.username;
          dataUser.cart = currentCart[0];
        }
        return dataUser;
      };

      const currentUser = await Promise.resolve(getCurrentUser());
      await setUserData(currentUser);
      const showUser = getSavedUser();
      console.log(`showUser:`);
      console.log(showUser);
      console.log(showUser!.cart.product);

      const productToUpdate = async (products : any[]) => {
        try {
          const response = await axios.get(
            `https://ksp2.onrender.com/products`
          );
          const data = response.data;
          const filteredData = data.filter(product => products.includes(product._id));
          return filteredData;
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }; 
      const resForProductToUpdate = await Promise.resolve(productToUpdate(showUser!.cart.product));
      console.log("productToUpdate : ");
      console.log(resForProductToUpdate);
      setCartItems(resForProductToUpdate);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleProductPress = async (product: Product) => {
    try {
      const response = await axios.get(
        `https://ksp2.onrender.com/products/${product.id}`
      );
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await axios.delete(
        `https://ksp2.onrender.com/api/carts/${user.cartId}/${itemId}`
      );
      fetchCartItems(); // Refresh cart items after removing an item
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>

      {/* Cart items */}
      {cartItems.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={() => handleProductPress(product)}
        >
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{product!.title}</Text>
            <Text style={styles.itemPrice}>{product.price}</Text>
            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#FF0000"
                />
              )}
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
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>
              <Button
                mode="contained"
                style={styles.closeButton}
                onPress={handleModalClose}
              >
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
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
  },
  itemName: {
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#1DA1F2",
    width: 100,
    alignSelf: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#1DA1F2",
    marginTop: 20,
  },
});

export default Cart;
