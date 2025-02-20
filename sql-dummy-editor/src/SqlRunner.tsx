import Split from "react-split";
import QueryContainer from "./Components/QueryContainer";
import Results from "./Components/Results";
import { useQueryContext } from "./Context/QueryContext";

export default function SqlRunner() {
    const { results } = useQueryContext(); // Only pull `results` from context for Results
    return (
        <Split
            sizes={[50, 50]} // Equal split for the two sections
            minSize={200}
            gutterSize={10}
            direction="horizontal"
            className="split-container"
            draggable={true}
        >
            <section className="query-section">
                <QueryContainer />
            </section>
            {/* not to render results all the time - only when results are updated */}
            <section className="result-section">
                <Results results={results} />
            </section>
        </Split>
    );
}
