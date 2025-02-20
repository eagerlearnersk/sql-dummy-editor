
import './App.css'
import { QueryProvider } from './Context/QueryContext'
import SqlRunner from './SqlRunner'

function App() {
  return (
    <>
      <header className='text-center'>
        <h1 style={{ fontWeight: 'bold', fontSize: 'x-large'}}> Web Based Sql Runner</h1>
      </header>
      <QueryProvider>

        <section className='sql-runner-container'>
          <SqlRunner />
        </section>
      </QueryProvider>
    </>
  )
}

export default App
