import React from 'react';
import Todo from './Components/Todo';
import DisplaySettingsContext from './Contex/Settings';
import AuthProvider from '../src/auth';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <AuthProvider>
      <MantineProvider>
        <DisplaySettingsContext.Consumer>
          {displaySettings => (
            <Todo displaySettings={displaySettings} />
          )}
        </DisplaySettingsContext.Consumer>
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;