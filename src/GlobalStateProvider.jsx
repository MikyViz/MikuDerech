import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {

  const [globalState, setGlobalState] = useState({
    filters: [],
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider, GlobalStateContext };
