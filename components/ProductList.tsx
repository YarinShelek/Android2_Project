import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Modal, Text, StyleSheet, Image } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import Carousel, { RenderItemProps } from 'react-native-snap-carousel';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://ksp2.onrender.com/products');
      const data = await response.json();
      // Limit the number of displayed products to 20
      setData(data.slice(0, 20));
    } catch (err) {
      console.log(`Error fetching products: ${err}`);
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const checkDataFetched = () => {
    if (data.length > 0) {
      console.log('Data fetched');
    } else {
      console.log('Data is not fetched yet.');
    }
  };

  useEffect(() => {
    checkDataFetched();
  }, [data]);

  const handleAddToCart = (product: Product) => {
    // Implement your logic for adding the product to the cart
    console.log(`Added to cart: ${product.title}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data.map((product) => (
          <TouchableOpacity key={product.id} onPress={() => handleProductPress(product)}>
            <Card style={styles.card}>
              <Card.Content>
                {product.images && product.images.length > 0 && (
                  <View style={styles.productImage}>
                    <Carousel
                      data={product.images}
                      renderItem={({ item }: RenderItemProps<string>) => (
                        <Image source={{ uri: item }} style={styles.carouselImage} resizeMode="contain" />
                      )}
                      sliderWidth={300}
                      itemWidth={300}
                      loop
                      autoplay
                      autoplayInterval={3000}
                    />
                  </View>
                )}
                <View style={styles.textContainer}>
                  <Title style={styles.productName}>{product.title}</Title>
                  <Text style={styles.productPrice}>{`${product.price}$`}</Text>
                  <Text style={styles.category}>{`Category: ${product.category}`}</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="contained"
                  onPress={() => handleAddToCart(product)}
                  style={styles.addButton}
                  labelStyle={styles.addButtonLabel}
                >
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
              <Text style={styles.title}>{selectedProduct.title}</Text>
              <Text style={styles.price}>{`${selectedProduct.price}$`}</Text>
              <Text style={styles.description}>{selectedProduct.description}</Text>
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <Carousel
                  data={selectedProduct.images}
                  renderItem={({ item }: RenderItemProps<string>) => (
                    <Image source={{ uri: item }} style={styles.productImageModal} resizeMode="contain" />
                  )}
                  sliderWidth={300}
                  itemWidth={300}
                  loop
                  autoplay
                  autoplayInterval={3000}
                />
              )}
              <Button
                mode="contained"
                onPress={handleCloseModal}
                style={styles.closeButton}
                labelStyle={styles.closeButtonLabel}
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
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  cardActions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#1DA1F2',
    alignSelf: 'center',
  },
  addButtonLabel: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
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
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  productImageModal: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#1DA1F2',
    width: '50%',
    alignSelf: 'center',
  },
  closeButtonLabel: {
    fontSize: 16,
  },
});

export default ProductList;
