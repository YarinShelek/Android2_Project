import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Search: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    const searchResults = [];
    console.log(searchResults);
  };

  return (
    <View style={styles.container}>
      {/* Product Name */}
      <TextInput
        style={styles.searchInput}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      {/* Price Range */}
      <TextInput
        style={styles.searchInput}
        placeholder="Price Range"
        value={priceRange}
        onChangeText={setPriceRange}
      />
      {/* Category */}
      <TextInput
        style={styles.searchInput}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      {/* Search Button */}
      <Button mode="contained" style={styles.searchButton} onPress={handleSearch}>
        Search
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderColor: '#333333',
  },
  searchButton: {
    marginBottom: 16,
    backgroundColor: '#1DA1F2',
  },
});

export default Search;
