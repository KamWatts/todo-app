import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { DisplaySettingsProvider } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DisplaySettingsProvider>
      <App />
    </DisplaySettingsProvider>
  </React.StrictMode>,
);
