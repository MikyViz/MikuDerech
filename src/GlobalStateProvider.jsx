import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {

  const currentDate = new Date(); // Текущая дата
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

  const [globalState, setGlobalState] = useState({
    filters: [],
    currentFilter: {EndDate: threeMonthsAgo ,StartDate: currentDate, City: 'ירושלים', Agency: '', Cluster: '', SubCluster: '', Line : '', LineType:''}
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider, GlobalStateContext };
