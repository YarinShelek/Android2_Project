import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Card, Title, Button } from "react-native-paper";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://ksp2.onrender.com/products`);
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.log(`Error fetching products: ${err}`);
    }
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const checkDataFetched = () => {
    if (data.length > 0) {
      console.log("Data fetched");
    } else {
      console.log("Data is not fetched yet.");
    }
  };

  useEffect(() => {
    // console.log("check if Data fetched");
    checkDataFetched();
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => handleProductPress(product)}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <Title style={styles.productName}>{product.title}</Title>
                <Title style={styles.productPrice}>
                  Price: {product.price}
                </Title>
                <Text style={styles.category}>
                  Category: {product.category}
                </Text>
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

      <Modal
        visible={selectedProduct !== null}
        animationType="slide"
        transparent
      >
        <View style={styles.modalContainer}>
          {selectedProduct && (
            <View style={styles.modalContent}>
              <Text style={styles.title}>{selectedProduct.title}</Text>
              <Text style={styles.price}>Price: {selectedProduct.price}</Text>
              <Text style={styles.description}>
                {selectedProduct.description}
              </Text>
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Button
                mode="contained"
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
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
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  card: {
    marginBottom: 10,
    elevation: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  productPrice: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 8,
  },
  cardActions: {
    justifyContent: "flex-end",
  },
  addButton: {
    backgroundColor: "#1DA1F2",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    elevation: 4,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "#1DA1F2",
  },
});

export default ProductList;
