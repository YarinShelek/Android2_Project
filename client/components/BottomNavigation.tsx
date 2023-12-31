import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";
import ProductList from "./ProductList";
import SettingsPage from "./SettingsPage";
import Cart from "./Cart";
import Search from "./Search";

interface BottomNavBarProps {
  data: string;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ data }) => {
  const [index, setIndex] = React.useState(0);
  console.log(`Data inside BottomNavBar: ${data}`);
  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "home":
        return <ProductList />;
      case "search":
        return <Search />;
      case "cart":
        return <Cart data={data ? data : "kobi"} />;
      case "settings":
        return <SettingsPage />;
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
    { key: "cart", title: "Cart", icon: "cart" },
    { key: "settings", title: "Settings", icon: "cog" },
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
      barStyle={{ backgroundColor: "#F5F5F5" }}
    />
  );
};

export default BottomNavBar;
