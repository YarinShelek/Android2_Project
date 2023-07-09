import React, { useContext, useState } from "react";
import { Provider as PaperProvider, Text } from "react-native-paper";
import BottomNavigation from "./components/BottomNavigation";
import Login from "./components/Login";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  const [user, setUser] = useState('');
  const [data, setData] = useState('');

  const handleDataChange = (newData: string) => {
    setData(newData);
  };
  const handleLogin = (userData:any) => {
    console.log("Logged in user:", userData);
    setUser(userData);
  };

  // Usage of UserProvider
  return (
    <PaperProvider>
      <UserProvider>
        {user ? (
          <BottomNavigation user={data} />
        ) : (
          <Login onLogin={handleLogin} onDataChange={handleDataChange}/> // Pass the complete user data to Login component
        )}
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
