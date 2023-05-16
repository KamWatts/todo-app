import React from 'react';
import Todo from './Components/Todo';
import DisplaySettingsProvider from './Contex/Settings';

export default class App extends React.Component {
  render() {
    return (
      <DisplaySettingsProvider>
        <Todo />
      </DisplaySettingsProvider>
    );
  }
}