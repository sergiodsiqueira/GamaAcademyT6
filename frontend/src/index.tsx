import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import GlobalStyle from './styles/globalStyle';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <GlobalStyle />
      <Router />
    </SnackbarProvider>
  </React.StrictMode>
);
