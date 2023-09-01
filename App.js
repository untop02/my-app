import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';
import React from 'react';
const App = () => {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
