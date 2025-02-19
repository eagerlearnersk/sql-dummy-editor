import { useQueryContext } from '../Context/QueryContext';


const CopyIcon = ({ width, height, fill }: { width: number, height: number, fill: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
        <path d="M16 1H4C2.89 1 2 1.89 2 3v18c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V3c0-1.11-.89-2-2-2zm0 16H4v-2h12v2zm0-5H4v-2h12v2zm-5-2V6c0-1.11-.89-2-2-2h-2v8h4zm-2-5h-2v2h2V9z" />
    </svg>
)

const Download = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <path d="M12 3v15" />
    </svg>
)

const Share = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 5h-7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/>
    <path d="M12 17v4l-3-2 3-2z"/>
  </svg>
)
const Results = () => {
    const { queries, results } = useQueryContext();

    return (
        <section>
            <header className="flex justify-between mb-5 border-bottom p-5">
                <h3 className="text-xl font-bold">Output</h3>
                <section>
                    <button className='px-2 py-2'> {/* Copy button */}
                        <CopyIcon width={18} height={18} fill={'black'} /> {/* Smaller icon */}
                    </button>
                    <button className='px-2 py-2'>
                        <Download></Download>
                    </button>
                    <button className='px-2 py-2'>
                        <Share/>
                    </button>
                </section>
            </header>

            <section className='result-body'>
                {queries.map((query, index) => (
                    <div key={`${query}-${index}`} className='m-20'>
                        {results[query] ? <h4>{query}</h4> : null}
                        {results[query] ? (
                            <div className="table-container"> {/* Container for scrolling */}
                                <table className='results-table'>
                                    <thead>
                                        <tr>
                                            {results[query] && results[query][0] && Object.keys(results[query][0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results[query].map((row: any, rowIndex: number) => (
                                            <tr key={rowIndex}> {/* Remember to improve keys if possible */}
                                                {Object.values(row).map((value: any, cellIndex: number) => (
                                                    <td key={cellIndex}>{value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </div>
                ))}
            </section>
        </section>
    );
};

export default Results;