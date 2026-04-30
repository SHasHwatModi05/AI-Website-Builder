import React, { useState } from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import WebsiteEditor from './pages/Editor'
import LiveSite from './pages/LiveSite'
import Pricing from './pages/Pricing'

export const serverUrl="https://api.genwebai.online"

// AppContent lives INSIDE BrowserRouter so hooks that use router context work correctly
function AppContent() {
  const isLoading = useGetCurrentUser()
  const {userData}=useSelector(state=>state.user)

  // Wait for the /me check to finish before rendering protected routes
  if (isLoading) return null

  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/dashboard' element={userData ? <Dashboard/> : <Navigate to='/' replace/>}/>
     <Route path='/generate' element={userData ? <Generate/> : <Navigate to='/' replace/>}/>
     <Route path='/editor/:id' element={userData ? <WebsiteEditor/> : <Navigate to='/' replace/>}/>
      <Route path='/site/:id' element={<LiveSite/>}/>
       <Route path='/pricing' element={<Pricing/>}/>
   </Routes>
  )
}

function App() {
  return (
   <BrowserRouter>
     <AppContent/>
   </BrowserRouter>
  )
}

export default App
