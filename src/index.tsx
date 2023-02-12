import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './modules/navigation';

function App() {
  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  );
}

export default App;