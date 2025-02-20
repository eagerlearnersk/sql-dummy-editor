import { memo, useMemo } from 'react';
import { CopyIcon, Download, Share } from '../Icons';

const Results = ({ results }: { results: { [key: string]: any } }) => {
    const renderResults = useMemo(() => {
        return Object.entries(results).map(([query, result], index) => {
            if (!Array.isArray(result)) return null;

            const headers = result.length > 0 ? Object.keys(result[0]) : [];

            return (
                <div key={`${query}-${index}`} className="m-20">
                    <h4>{query}</h4>
                    <div className="table-container">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    {headers.map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((row) => (
                                    <tr key={`${query}-${row}`}>
                                        {headers.map((header) => (
                                            <td key={`${header}`}>{row[header]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        });
    }, [results]);

    return (
        <section>
            <header className="flex justify-between mb-5 border-bottom p-5">
                <h3 className="text-xl font-bold">Output</h3>
                <section>
                    <button className="px-2">
                        <CopyIcon width={18} height={18} fill="black" />
                    </button>
                    <button className="px-2">
                        <Download />
                    </button>
                    <button className="px-2">
                        <Share />
                    </button>
                </section>
            </header>
            <section className="result-body">{renderResults}</section>
        </section>
    );
};

export default memo(Results);
