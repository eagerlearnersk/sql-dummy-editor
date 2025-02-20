import { createContext, useContext, ReactNode, useReducer, Dispatch } from 'react';
import suppliers from '../mockData/suppliers.json'
import shippers from '../mockData/shippers.json'
import regions from '../mockData/regions.json'
import categories from '../mockData/categories.json'
import customers from '../mockData/customers.json'
import territories from '../mockData/territories.json'


interface SqlRunnerState {
  queries: string[]
  results: ResultDataMap
  loading: boolean
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
  loading: boolean
  runQueryWithDelay: (dispatch: Dispatch<Action>, queries: string[], delay: number) => void
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);
const mockQueries = [
  'SELECT * FROM REGIONS',
  'SELECT * FROM SHIPPERS',
  'SELECT * FROM SUPPLIERS',
]

const testResults = [[...regions], [...shippers], [...suppliers], [...categories], [...customers], [...territories]]

const mockResults = {
  'SELECT * FROM REGIONS': [...regions],
  'SELECT * FROM SHIPPERS': [...shippers],
  'SELECT * FROM SUPPLIERS': [...suppliers],
  'SELECT * FROM CATEGORIES': [...categories],
  'SELECT * FROM CUSTOMERS': [...customers],
  'SELECT * FROM TERRITORIES': [...territories],
}


function getResults(queries: string[]) {
  const res: ResultDataMap = {}
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
        loading: true,
        //results: getResults(state.queries),
      };
    case "SET_RESULTS":
      return {
        ...state,
        results: getResults(state.queries),
        loading: false, // Stop loading after results are set
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

  const [state, dispatch]: [SqlRunnerState, Dispatch<Action>] = useReducer(QueryReducer, { queries: mockQueries, results: mockResults, loading: false })

  function runQueryWithDelay(dispatch: Dispatch<Action>, queries: string[], delay: number = 2000) {
    console.log(delay)
    dispatch({ type: "RUN_SQL" });
    setTimeout(() => {
      const results = getResults(queries);
      dispatch({ type: "SET_RESULTS", payload: results });
    }, delay);
  }
  return (
    <QueryContext.Provider value={{ queries: state.queries, results: state.results, dispatch, loading: state.loading, runQueryWithDelay }}>
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
