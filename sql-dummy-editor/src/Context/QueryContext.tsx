import { createContext, useState, useContext, ReactNode } from 'react';
// import suppliers from '../Data/suppliers.json'
import shippers from '../Data/shippers.json'
import regions from '../Data/regions.json'

interface QueryContextType {
  queries: string[];
  results: Record<string, any>;
  showResults: boolean;
  showOutputScreen: (showRests: boolean) => void;
  addQuery: (query: string, result: any) => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);
const mockQueries = [
  'SELECT * FROM REGIONS',
  'SELECT * FROM SHIPPERS',
  // 'SELECT * FROM SUPPLIERS'
]

const mockResults = {
  'SELECT * FROM REGIONS': [...regions],
  'SELECT * FROM SHIPPERS': [...shippers],
  //   'SELECT * FROM SUPPLIERS': [...suppliers]
}


export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queries, setQueries] = useState<string[]>(mockQueries);
  const [results, setResults] = useState<Record<string, any>>(mockResults);
  const [showResults, setShowResults] = useState<boolean>(true)

  const addQuery = (query: string, result: any) => {
    setQueries(prev => [...prev, query]);
    setResults(prev => ({ ...prev, [query]: result }));
  };

  const showOutputScreen = (showRests: boolean) => {
    setShowResults(showRests)
  }

  return (
    <QueryContext.Provider value={{ queries, results, showResults, showOutputScreen, addQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within a QueryProvider");
  }
  return context;
};
