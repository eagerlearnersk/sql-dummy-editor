import { createContext, useState, useContext, ReactNode, act, useReducer } from 'react';
import suppliers from '../Data/suppliers.json'
import shippers from '../Data/shippers.json'
import regions from '../Data/regions.json'


interface QueryResult {
  queries: string[];
  results: Record<string, any>;
}


interface QueryContextType extends QueryResult {
  queries: string[];
  results: Record<string, any>;
  // addQuery: (query: string, result: any) => void;
  dispatch: any
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);
const mockQueries = [
  'SELECT * FROM REGIONS',
  'SELECT * FROM SHIPPERS',
  'SELECT * FROM SUPPLIERS'
]

const testResults = [[...regions], [...shippers], [...suppliers]]

const mockResults = {
  'SELECT * FROM REGIONS': [...regions],
  'SELECT * FROM SHIPPERS': [...shippers],
  'SELECT * FROM SUPPLIERS': [...suppliers]
}


function getResults(queries: string[]) {
  const res: any = {}
  for (let query of queries) {
    let resArr = testResults[Math.floor(Math.random() * testResults.length)]
    res[query] = resArr
  }
  return res
}
function QueryReducer(state: any, actions: any) {

  switch (actions.type) {
    case "ADD_QUERY":
      return {
        ...state,
        queries: [...state.queries, actions.query]
      }
    case "REMOVE_QUERY":
      return { ...state, queries: state.queries.filter((_: string, i: number) => i !== actions.index) };
    case "RUN_SQL":
      return {
        ...state,
        results: getResults(state.queries),
      };
    case 'RESET_QUERY':
      return {
        ...state,
        queries: []
      }
    default:
      return state;
  }
}


export const QueryProvider = ({ children }: { children: ReactNode }) => {
  // const [queries, setQueries] = useState<string[]>(mockQueries);
  // const [results, setResults] = useState<Record<string, any>>(mockResults);
  // const [showResults, setShowResults] = useState<boolean>(true)

  const [state, dispatch] = useReducer(QueryReducer, { queries: mockQueries, results: mockResults })




  return (
    <QueryContext.Provider value={{ queries: state.queries, results: state.results, dispatch }}>
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
