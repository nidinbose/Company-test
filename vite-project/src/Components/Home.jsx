import React from 'react'
import Landing from './HomeComponents/Landing'
import Top from './HomeComponents/Top'
import Bottom from './HomeComponents/Bottom'

const Home = () => {
  return (
    <div className='bg-gray-100'>
      <Top/>
        <Landing/>
        <Bottom/>
    </div>
  )
}

export default Home