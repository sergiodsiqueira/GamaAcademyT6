import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import GlobalStyle from './styles/globalStyle'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <GlobalStyle/>
      <Router />
  </React.StrictMode>
);
