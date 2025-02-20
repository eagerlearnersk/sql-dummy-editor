
import './App.css'
import { QueryProvider } from './Context/QueryContext'
import SqlRunner from './SqlRunner'

function App() {
  return (
    <QueryProvider>
      <section className='sql-runner-container'>
        <SqlRunner/>
      </section>
    </QueryProvider>
  )
}

export default App
