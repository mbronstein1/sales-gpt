import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense>
            <App />
          </Suspense>
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
