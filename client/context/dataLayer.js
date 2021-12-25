import { createContext, useContext, useMemo, useReducer } from "react";
export const DataLayerContext = createContext();
export const DataLayer = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return (
    <DataLayerContext.Provider value={value}>
      {children}
    </DataLayerContext.Provider>
  );
};
export const useDataLayer = () => useContext(DataLayerContext);
