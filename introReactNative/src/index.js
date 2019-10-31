import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './routes';
import './config/ReactotronConfig';

// Removendo warning gerado por usar o socket.io
YellowBox.ignoreWarnings(['Encountered two children']);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
