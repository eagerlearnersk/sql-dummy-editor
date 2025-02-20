import { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react';
import suppliers from '../Data/suppliers.json'
import shippers from '../Data/shippers.json'
import regions from '../Data/regions.json'
import categories from '../Data/categories.json'
import customers from '../Data/customers.json'
import territories from '../Data/territories.json'


interface SqlRunnerState {
  queries: string[]
  results: ResultDataMap 
}


interface Action {
  type: string;
  payload?: any;
}

interface ResultDataMap {
  [key: string]: string | number | boolean | object[];
}

interface QueryResult {
  queries: string[];
  results: ResultDataMap
}


interface QueryContextType extends QueryResult {
  queries: string[];
  results: ResultDataMap 
  dispatch: Dispatch<Action>
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);
const mockQueries = [
  'SELECT * FROM REGIONS',
  'SELECT * FROM SHIPPERS',
  'SELECT * FROM SUPPLIERS'
]

const testResults = [[...regions], [...shippers], [...suppliers], [...categories], [...customers],[...territories]]

const mockResults = {
  'SELECT * FROM REGIONS': [...regions],
  'SELECT * FROM SHIPPERS': [...shippers],
  'SELECT * FROM SUPPLIERS': [...suppliers],
  'SELECT * FROM CATEGORIES': [...categories],
  'SELECT * FROM CUSTOMERS': [...customers],
  'SELECT * FROM TERRITORIES': [...territories],
}


function getResults(queries: string[]) {
  const res: ResultDataMap={}
  for (let query of queries) {
    let resArr = testResults[Math.floor(Math.random() * testResults.length)]
    res[query] = resArr
  }
  return res
}
function QueryReducer(state: SqlRunnerState, actions: Action) {

  switch (actions.type) {
    case "ADD_QUERY":
      return {
        ...state,
        queries: [...state.queries, actions.payload]
      }
    case "REMOVE_QUERY":
      return { ...state, queries: state.queries.filter((_: string, i: number) => i !== actions.payload) };
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

  const [state, dispatch]:[SqlRunnerState,  Dispatch<Action>] = useReducer(QueryReducer, { queries: mockQueries, results: mockResults })

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
