import { useState } from 'react';
import { useQueryContext } from '../Context/QueryContext'
import { Trash, Run } from '../Icons';



const QueryContainer = () => {
  const [queryText, setQueryText] = useState("");
  const [showQueryInpt, setShowQueryIp] = useState(false);
  const { queries, dispatch } = useQueryContext();

  const TrashButton = ({ removeHandler }: { removeHandler: any }) => {
    return (
      <button className="p-2" onClick={() => {
        removeHandler()
      }}>
        <Trash />
      </button>
    )
  }

  const handleRunQuery = () => {
    dispatch({ type: 'RUN_SQL' })
  };

  return (
    <section>
      <header className="flex justify-between mb-5 border-bottom pt-4 px-4">
        <h3 className="text-xl font-bold">Input</h3>
        <section className='btn-header-section'>
          <button className="px-2 py-2 bg-green-500 text-white rounded-md" onClick={handleRunQuery} title='Run'><Run /></button>
          <button
          title='Reset'
            className="px-2 py-2 bg-gray-100 text-black rounded-md m-2 reset-btn"
            onClick={() => {
              dispatch({ type: 'RESET_QUERY' })
            }}>Reset</button>
        </section>

      </header>

      <section className="space-y-2 p-5">
        {queries.map((query, index) => (
          <div key={`${query}-${index}`}>
            <textarea
              key={index}
              value={query}
              readOnly
              className="w-md border p-2 rounded-md bg-gray-100"
            />
            <TrashButton removeHandler={() => {
              dispatch({ type: 'REMOVE_QUERY', payload:index })
            }} />
          </div>
        ))}
      </section>
      <form className='p-5'>
        {showQueryInpt && (
          <div className="flex gap-2 mt-2 p-5">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Enter your SQL query..."
              className="border p-2 flex-grow rounded-md"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md text text-center"
              onClick={ev => {
                ev.preventDefault();
                dispatch({ type: 'ADD_QUERY', payload: queryText })
                // addQuery(queryText, mockResult)
                setQueryText("");
                // showOutputScreen(false)
              }}>Save</button>



          </div>
        )}
        <button
          title='Create More'
          className="m-auto px-4 py-2 bg-gray-300 rounded-md add-query"
          onClick={(ev) => {
            ev.preventDefault()
            setShowQueryIp(showIp => !showIp)
          }}> Create More</button>
      </form>

    </section>
  );
};

export default QueryContainer;
