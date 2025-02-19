import { useState } from 'react';
import { useQueryContext } from '../Context/QueryContext'

const QueryContainer = () => {
  const [queryText, setQueryText] = useState("");
  const [showQueryInpt, setShowQueryIp] = useState(false);
  const { queries, addQuery, showOutputScreen } = useQueryContext();

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
    showOutputScreen(true)
  };

  return (
    <>
      <header>
        <h3>Query/Input</h3>
        <section>
          <button onClick={handleRunQuery}>Run Query</button>
        </section>
      </header>
      <form>
        {queries.map(query => {
          return (
            <textarea
              value={query}
              className='query-text'
            />
          )
        })}

        <section>
          <div>
            {showQueryInpt ? (<>
              <input
                type="text"
                value={queryText}
                onChange={(e) => {
                  setQueryText(e.target.value)
                }
                }
                placeholder="Enter your SQL query..."
              />
              <button onClick={ev => {
                ev.preventDefault();
                addQuery(queryText, mockResult)
                setQueryText("");
                setShowQueryIp(false)
                // showOutputScreen(false)
              }}>+</button>
            </>) : null}
          </div>

          <button onClick={(ev) => {
            ev.preventDefault()
            setShowQueryIp(showIp => !showIp)
          }}> Add Query</button>
        </section>

      </form>


    </>
  );
};

export default QueryContainer;
