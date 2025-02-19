import {  useState } from 'react';
import { useQueryContext } from '../Context/QueryContext'




const QueryContainer = () => {
  const [queryText, setQueryText] = useState("");
  const [showQueryInpt, setShowQueryIp] = useState(false);
  const { queries, dispatch } = useQueryContext();

  const TrashButton = ({ removeHandler } : {removeHandler: any}) => {
    return (
      <button className="p-2"  onClick={() => {
        removeHandler()
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-500 hover:text-red-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    )
  }

  // mock result
  const mockResult = [
    {
      "regionID": 1,
      "regionDescription": "Eastern"
    },
    {
      "regionID": 2,
      "regionDescription": "Western"
    },
    {
      "regionID": 3,
      "regionDescription": "Northern"
    },
    {
      "regionID": 4,
      "regionDescription": "Southern"
    }
  ];

  const handleRunQuery = () => {
    dispatch({ type: 'RUN_SQL'})
    // showOutputScreen(true)
  };

  return (
    <section className="p-4 mx-auto bg-white shadow-md">
      <header className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">Query/Input</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleRunQuery}>Run SQL</button>
      </header>
      <section className="space-y-2">
        {queries.map((query, index) => (
          <div key={`${query}-${index}`}>
            <textarea
              key={index}
              value={query}
              readOnly
              className="w-md border p-2 rounded-md bg-gray-100"
            />
            <TrashButton removeHandler={() => {
              dispatch({ type: 'REMOVE_QUERY', index})
            }}/>
          </div>
        ))}
      </section>
      <form>
        {showQueryInpt && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Enter your SQL query..."
              className="border p-2 flex-grow rounded-md"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={ev => {
                ev.preventDefault();

                dispatch({ type: 'ADD_QUERY', query: queryText})

                // addQuery(queryText, mockResult)
                setQueryText("");

                // showOutputScreen(false)
              }}>+</button>

          </div>
        )}
        <button
          className="mt-2 px-4 py-2 bg-gray-300 rounded-md"
          onClick={(ev) => {
            ev.preventDefault()
            setShowQueryIp(showIp => !showIp)
          }}> Add Query</button>
      </form>

    </section>
  );
};

export default QueryContainer;
