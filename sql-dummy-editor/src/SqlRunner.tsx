import { lazy, Suspense } from "react";
import QueryContainer from "./Components/QueryContainer";
import { useQueryContext } from "./Context/QueryContext";

const Results = lazy(() => import("./Components/Results"));
const Split = lazy(() => import("react-split"));

export default function SqlRunner() {
    const { results, loading } = useQueryContext();

    return (
        <Suspense fallback={<p>Loading SqlRunner...</p>}>
            <Split
                sizes={[50, 50]}
                minSize={200}
                gutterSize={10}
                direction="horizontal"
                className="split-container"
                draggable={true}
            >
                <section className="query-section">
                    <QueryContainer />
                </section>

                <section className="result-section">
                    {results ? (
                        <Suspense fallback={<p>Loading results...</p>}>
                            <Results results={results} loading={loading} />
                        </Suspense>
                    ) : (
                        <p>No results to display</p>
                    )}
                </section>
            </Split>
        </Suspense>
    );
}
