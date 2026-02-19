import React from 'react'
import Layout from './components/Layout'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import WatchListPage from './pages/WatchListPage'


const App = () => {
  return (
    <Layout>
      {/* <h1 className='text-3xl'>TMDB Project Version 1</h1> */}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Watchlist' element={<WatchListPage/>}/>
      </Routes>
    </Layout>
  )
}

export default App