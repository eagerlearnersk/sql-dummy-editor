
import './App.css'
import Results from './Components/Results'
import SqlRunner from './SqlRunner'

function App() {

  return (
      <section className='sql-runner-container'>
        <SqlRunner></SqlRunner> <Results></Results>
      </section>
  )
}

export default App
