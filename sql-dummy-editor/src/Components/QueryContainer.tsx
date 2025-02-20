import { useState, memo, useCallback, useMemo } from 'react';
import { useQueryContext } from '../Context/QueryContext'
import { Trash, Run } from '../Icons';

const QueryContainer = () => {
  const [queryText, setQueryText] = useState("");
  const [showQueryInput, setShowQueryInput] = useState(false);
  const { queries, dispatch, runQueryWithDelay } = useQueryContext();
  const TrashButton = memo(({ removeHandler }: { removeHandler: React.MouseEventHandler<HTMLButtonElement> }) => {
    return (
      <button className="p-2" onClick={removeHandler}>
        <Trash />
      </button>
    );
  });

  const handleSaveQuery = useCallback((ev: React.MouseEvent) => {

    ev.preventDefault();
    if (queryText !== "") {
      dispatch({ type: 'ADD_QUERY', payload: queryText })
      // addQuery(queryText, mockResult)
      setQueryText("");
      setShowQueryInput(prev => !prev)
    } else {
      // Can add more validations -
      // TODO: check for valid sql query
      alert("enter valid input");
    }
    // showOutputScreen(false)
  }, [queryText, dispatch])

  const handleDismiss = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    setQueryText("");
    setShowQueryInput(prev => !prev)
    // showOutputScreen(false)
  }, [queryText, dispatch])

  const toggleQueryInput = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    setShowQueryInput(prev => !prev);
  }, []);



  const handleRemoveQuery = useCallback((index: number) => {
    dispatch({ type: "REMOVE_QUERY", payload: index });
  }, [dispatch]);

  const handleRunQuery = useCallback(() => {
    runQueryWithDelay(dispatch, queries, 1000)

  }, [dispatch, queries]);

  const handleResetQuery = useCallback(() => {
    dispatch({ type: "RESET_QUERY" });
  }, [dispatch]);


  const HeaderButtons = memo(() => {
    return (
      <section className="btn-header-section">
        <button
          className="px-2 py-2 bg-green-500 text-white rounded-md"
          onClick={handleRunQuery}
          title="Run"
        >
          <Run />
        </button>
        <button
          title="Reset"
          className="px-2 py-2 bg-gray-200 text-black rounded-md m-2 reset-btn"
          onClick={handleResetQuery}
        >
          Reset
        </button>
      </section>
    );
  });

  const queryList = useMemo(() =>
    queries.map((query, index) => (
      <div key={`${query}-${index}`}>
        <textarea
          value={query}
          readOnly
          className="w-md border p-2 rounded-md bg-gray-100"
        />
        <TrashButton
          removeHandler={() => handleRemoveQuery(index)}
        />
      </div>
    )), [queries, handleRemoveQuery])

  return (
    <section>
      <header className="flex justify-between mb-5 border-bottom pt-4 px-4">
        <h3 className="text-xl font-bold">Input</h3>
        <HeaderButtons />
      </header>
      <section className="space-y-2 p-5">
        {queryList}
      </section>
      <form className='p-5'>
        {showQueryInput && (
          <div className="flex mt-2 p-5">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Enter your SQL query..."
              className="border p-2 flex-grow rounded-md"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md m-2"
              onClick={handleSaveQuery}>
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-black rounded-md m-2 reset-btn"
              onClick={handleDismiss}>
              Dismiss
            </button>
          </div>
        )}

        <button
          title='Create More'
          className="m-auto px-4 py-2 bg-gray-300 rounded-md add-query"
          onClick={toggleQueryInput}>
          Create More
        </button>
      </form>
    </section>
  );
};
export default memo(QueryContainer);