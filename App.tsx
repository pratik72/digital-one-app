import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppContainer from './src/navigation/app.navigation';
import { persistStore } from 'redux-persist'

const theme = {
  ...DefaultTheme,
  dark: false,
};

import { store } from "./src/reducers/store";

const persistor = persistStore(store);


export default function App() {
  return (
    <PaperProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
    </PaperProvider>
  );
}