import Split from "react-split";
import QueryContainer from "./Components/QueryContainer";
import Results from "./Components/Results";

export default function SqlRunner() {
    return (
        <Split
            sizes={[50, 50]} // 40% for queries, 60% for results
            minSize={200} // Minimum width
            gutterSize={10} // Space between panes
            direction="horizontal" // Side-by-side layout
            className="split-container"
        >
            <section className="query-section"><QueryContainer /></section>
            <section className="result-section"><Results /></section>
        </Split>
    )
}