import React, { createContext, useState } from 'react';


export const DisplaySettingsContext = createContext();


export const DisplaySettingsProvider = ({ children }) => {

  const [displaySettings, setDisplaySettings] = useState({
    numItemsToShow: 3,
    hideCompletedItems: true,
    sortDifficulty: ('easy', 'hard', 'advanced'),
  });


  return (
    <DisplaySettingsContext.Provider value={[displaySettings, setDisplaySettings]}>
      {children}
    </DisplaySettingsContext.Provider>
  );
};

export default DisplaySettingsProvider;
