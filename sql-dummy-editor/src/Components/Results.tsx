import { memo, useCallback, useMemo } from 'react';
import { CopyIcon, Download, Share } from '../Icons';

const Results = ({ results }: { results: { [key: string]: any } }) => {

    const handleDownload = useCallback(() => {
        const jsonString = JSON.stringify(results, null, 2); // Pretty print JSON
        const blob = new Blob([jsonString], { type: 'application/json' }); // Correct MIME type
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `results.sql`;
        link.click();
        URL.revokeObjectURL(url);
    }, [results]);

    const handleCopyQuery = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(results))
            .then(() => {
                alert(` copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy. Please try again.');
            });
    }, []);


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
                                        <th key={key} className='bold'>{key}</th>
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
                <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Output
                </h3>
                <section>
                    <button className="px-2" onClick={handleCopyQuery}>
                        <CopyIcon width={18} height={18} fill="black" />
                    </button>
                    <button className="px-2" onClick={handleDownload}>
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
