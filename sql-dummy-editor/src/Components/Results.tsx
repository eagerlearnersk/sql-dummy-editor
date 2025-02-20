import { useQueryContext } from '../Context/QueryContext';
import { CopyIcon, Download, Share } from '../Icons';

const Results = () => {
    const { queries, results } = useQueryContext();

    return (
        <section>
            <header className="flex justify-between mb-5 border-bottom p-5">
                <h3 className="text-xl font-bold">Output</h3>
                <section >
                    <button className='px-2'> {/* Copy button */}
                        <CopyIcon width={18} height={18} fill={'black'} /> {/* Smaller icon */}
                    </button>
                    <button className='px-2'>
                        <Download></Download>
                    </button>
                    <button className='px-2'>
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
                                            {results[query] && (results[query][0] as any) && Object.keys(results[query][0]).map((key) => (
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