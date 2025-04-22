import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import MainDashboard from './Components/AdminHandle/MainDashboard'
import Card1 from './Components/Cards/CardComponents/Card1'
import AddCard from './Components/Cards/AddCard'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={AddCard}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App