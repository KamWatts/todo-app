import React from 'react';
import Todo from './Components/Todo';
import DisplaySettingsProvider from './Contex/Settings';
import AuthProvider from '../src/auth'
import { MantineProvider } from '@mantine/core';

export function App()  {

    return (
      <AuthProvider>
        <MantineProvider>
          <DisplaySettingsProvider>
              <Todo />
          </DisplaySettingsProvider>
        </MantineProvider>
      </AuthProvider>
    );
  }