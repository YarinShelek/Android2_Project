import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import BottomNavigation from './components/BottomNavigation';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <BottomNavigation/>
    </PaperProvider>
  );
};

export default App;
