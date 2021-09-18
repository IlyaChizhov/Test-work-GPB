import React from 'react'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/Routes/Routes'

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
