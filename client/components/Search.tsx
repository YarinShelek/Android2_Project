import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Button,
  Searchbar,
  Text,
  RadioButton,
  DataTable,
  Card,
  Menu,
} from "react-native-paper";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}


interface SearchItem {
  id: string;
  query: string;
  option: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://ksp2.onrender.com/products");
      const data = response.data;
      let filteredData = data;

      if (selectedOptions.length > 0) {
        filteredData = data.filter((product: Product) => {
          return selectedOptions.some((option) => {
            switch (option) {
              case "name":
                return product.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              case "price":
                return product.price.toString().includes(searchQuery);
              case "category":
                return product.category
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              default:
                return false;
            }
          });
        });
      }

      setSearchResults(filteredData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }

    const newSearch: SearchItem = {
      id: Date.now().toString(),
      query: searchQuery,
      option: selectedOptions.join(","),
    };

    setSearchHistory((prevSearchHistory) => [newSearch, ...prevSearchHistory]);
    setSearchQuery("");
    setSelectedOptions([]);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const renderSearchItem = ({ item }: { item: SearchItem }) => (
    <DataTable.Row onPress={() => handleProductPress(item)}>
      <DataTable.Cell>{item.query}</DataTable.Cell>
      <DataTable.Cell>{item.option}</DataTable.Cell>
    </DataTable.Row>
  );

  const handleMenuToggle = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleAddToCart = (product: Product) => {
    // Add the product to the cart
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      {/* Option Button */}
      <Button style={styles.optionBtn} mode="outlined" onPress={handleMenuToggle}>
        Options
      </Button>
      {/* Advanced Search Inputs */}
      {showAdvancedSearch && (
        <View style={styles.advancedSearchContainer}>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <RadioButton.Android
                status={
                  selectedOptions.includes("name") ? "checked" : "unchecked"
                }
                onPress={() => handleOptionToggle("name")}
                color="#1DA1F2"
              />
              <Text>Name</Text>
            </View>
            <View style={styles.option}>
              <RadioButton.Android
                status={
                  selectedOptions.includes("price") ? "checked" : "unchecked"
                }
                onPress={() => handleOptionToggle("price")}
                color="#1DA1F2"
              />
              <Text>Price</Text>
            </View>
            <View style={styles.option}>
              <RadioButton.Android
                status={
                  selectedOptions.includes("category") ? "checked" : "unchecked"
                }
                onPress={() => handleOptionToggle("category")}
                color="#1DA1F2"
              />
              <Text>Category</Text>
            </View>
          </View>
        </View>
      )}
      {/* Search Button */}
      <Button
        mode="contained"
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
      {/* Search Results */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <Card style={styles.resultItem}>
              <Card.Content>
                <Text style={styles.productName}>{item.title}</Text>
                <Text>{item.price}$</Text>
                <Text>Category: {item.category}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Actions>
            </Card>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.searchResultsContainer}
        />
      ) : (
        <Text>No search results</Text>
      )}
      {/* History Text */}
      <Text style={styles.historyText}>History</Text>
      {/* Search History */}
      {searchHistory.length > 0 ? (
        <>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Query</DataTable.Title>
              <DataTable.Title>Options</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={searchHistory}
              renderItem={renderSearchItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => (
                <DataTable.Cell>No search history</DataTable.Cell>
              )}
            />
          </DataTable>
          <Button
            mode="contained"
            style={styles.clearButton}
            onPress={clearHistory}
          >
            Clear History
          </Button>
        </>
      ) : (
        <Text>No search history</Text>
      )}
      {/* Product Menu */}
      <Menu
        visible={menuVisible}
        onDismiss={handleMenuClose}
        anchor={
          selectedProduct ? (
            <Card style={styles.menuAnchor}>
              <Card.Content>
                <Text>{selectedProduct.name}</Text>
                <Text>Price: {selectedProduct.price}</Text>
                <Text>Category: {selectedProduct.category}</Text>
              </Card.Content>
            </Card>
          ) : null
        }
      >
        <Menu.Item
          onPress={() => handleAddToCart(selectedProduct)}
          title="Add to Cart"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  searchBar: {
    marginBottom: 16,
  },
  advancedSearchContainer: {
    marginBottom: 16,
    // paddingTop: 16,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  searchButton: {
    marginBottom: 16,
  },
  searchResultsContainer: {
    paddingBottom: 16,
  },
  resultItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyText: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  clearButton: {
    marginBottom: 16,
  },
  menuAnchor: {
    alignSelf: "flex-end",
  },
  optionBtn:{
    marginBottom: 16,
  }
});

export default Search;
