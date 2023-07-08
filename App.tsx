import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Text } from 'react-native';
import BottomNavigation from "./components/BottomNavigation";
import Login from "./components/Login";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  // Usage of UserProvider
  return (
    <PaperProvider>
      <UserProvider>
        {user ? <BottomNavigation /> : <Login onLogin={handleLogin} />}
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
