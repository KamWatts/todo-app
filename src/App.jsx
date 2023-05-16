import React, { createContext, useState } from 'react';


export const DisplaySettingsContext = createContext();


export const DisplaySettingsProvider = ({ children }) => {

  const [displaySettings, setDisplaySettings] = useState({
    numItemsToShow: 3,
    hideCompletedItems: true,
    sortDifficulty: 'easy',
  });

  // return the provider with the display settings state
  return (
    <DisplaySettingsContext.Provider value={[displaySettings, setDisplaySettings]}>
      {children}
    </DisplaySettingsContext.Provider>
  );
};
