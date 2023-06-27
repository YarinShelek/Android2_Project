import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";
import ProductList from "./ProductList";
import SettingsPage from "./SettingsPage ";

const SearchScreen = () => <Text>Search</Text>;

const ShoppingCartScreen = () => <Text>Shopping Cart</Text>;

const BottomNavBar = () => {
  const [index, setIndex] = React.useState(0);

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "home":
        return <ProductList />;
      case "search":
        return <SearchScreen />;
      case "settings":
        return <SettingsPage />;
      case "cart":
        return <ShoppingCartScreen />;
      default:
        return null;
    }
  };

  const handleIndexChange = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const routes = [
    { key: "home", title: "Home", icon: "home" },
    { key: "search", title: "Search", icon: "magnify" },
    { key: "settings", title: "Settings", icon: "cog" },
    { key: "cart", title: "Cart", icon: "cart" },
  ];

  const renderIcon = ({ route, color }: { route: any; color: string }) => (
    <Icon name={route.icon} color={color} size={24} />
  );

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      renderIcon={renderIcon}
      barStyle={{ backgroundColor: "#F5F5F5" }} // Smoke gray background color
    />
  );
};

export default BottomNavBar;
