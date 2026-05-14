import { useState } from 'react'
import './App.css'
import Decades from './components/Decades'

function App() {

  return (
    <main>
      <h1 className='text-primary text-5xl'>History and Timeline</h1>
      <nav className=''>navbar of decades here test</nav>
      <div className="container">

        <Decades />
            
      </div>
    </main>
  )
}

export default App
