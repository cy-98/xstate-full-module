import React, { createContext } from "react";

export const dataContext = createContext({ });
export const ContextProvider: <T>(value: T) => React.FC<{
  value: T;
}> =
  (value) =>
  ({ children }) => {
    return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
  };
