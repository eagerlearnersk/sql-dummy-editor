import { useQueryContext } from '../Context/QueryContext'

const Results = () => {
  const { queries, results, showResults } = useQueryContext();
  console.log(results, "res")
  return (
    <section>
      <h3>Query Results:</h3>
      <div className='result-body'>
        {queries.map((query, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{query}</h4>
            {results[query] ? (
              <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {Object.keys(results[query][0]).map((key) => (
                      <th key={key} style={{ padding: "8px", background: "#f2f2f2" }}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results[query].map((row: any, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value: any, cellIndex: number) => (
                        <td key={cellIndex} style={{ padding: "8px" }}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Results;
