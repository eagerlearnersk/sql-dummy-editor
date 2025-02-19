import { useState } from "react"

interface SqlQuery {
    id: string;
    desc: string;
}

export default function QueryForm() {

    const [queries, setQueries] = useState<SqlQuery[]>([])
    const onAddQuery = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault()
        setQueries(queries => [...queries, {
            id: `${queries.length + 1}`,
            desc: ''
        }])
    }
    return (
        <>
            <header>
                <h3>Input/Query</h3>
                <section className="query-action-items">
                    <button>Run Sql</button>
                    <button>Clear</button>
                </section>
            </header>
            <form>
                <div className="query-form">
                    {queries.map(query => {
                        return (
                            <>
                                <textarea key={`${query}-${Date.now()}`}
                                    className="query"
                                    rows={5}
                                    cols={5}
                                    placeholder="Enter new Query">{query.desc}</textarea>
                                <button>Delete</button>
                            </>
                        )
                    })}

                </div>
                <button type="button" onClick={onAddQuery}>Add Query</button>
            </form>
        </>

    )
}