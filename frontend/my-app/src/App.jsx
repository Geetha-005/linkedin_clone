import { useContext, useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Routes,Route, Navigate } from 'react-router-dom'
import { userDataContext } from './context/UserContext'
import Network from './pages/Network'
import Profile from './pages/Profile'

function App() {
  let {userData}=useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={userData?<Home />:<Navigate to="/login" />}/>
      <Route path='/signup' element={userData?<Navigate to="/" />:<Signup />} />
      <Route path='/login' element={userData?<Navigate to="/" />:<Login />} />
      <Route path='/network' element={userData?<Network />:<Navigate to="/login" />}/>
      <Route path='/profile' element={userData?<Profile />:<Navigate to="/login" />}/>

    </Routes>
  )
}

export default App
