import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import MainDashboard from './Components/AdminHandle/MainDashboard'
import Card1 from './Components/Cards/CardComponents/Card1'
import AddCard from './Components/Cards/AddCard'
import FormContainer from './Components/Forms/MultiStepForm'
import CardDashboard from './Components/Cards/CardDashboard'
import Navbar from './Components/HomeComponents/Navbar'
import Footer from './Components/HomeComponents/Footer'
import ViewOffer from './Components/Cards/CardComponents/viewOffer'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/addoffer' Component={FormContainer}/>
        <Route path='/dashboard' Component={CardDashboard}/>
        <Route path='/viewoffer/:id' Component={ViewOffer}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App