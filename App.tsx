import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import BottomNavigation from './components/BottomNavigation';
import Login from './components/Login';

const App: React.FC = () => {
  const [logged, setLogged] = React.useState(true);
  return (
    <PaperProvider>
      {logged ? <BottomNavigation/> : <Login /> }
      {/* <BottomNavigation/> */}
    </PaperProvider>
  );
};

export default App;
