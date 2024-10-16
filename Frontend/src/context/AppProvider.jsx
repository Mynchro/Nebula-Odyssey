/* eslint-disable react/prop-types */
import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
