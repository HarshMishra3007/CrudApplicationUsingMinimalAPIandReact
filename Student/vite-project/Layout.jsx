import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';

function Layout() {
  const [posts, setPosts] = useState([]);
  
  return (
    <>
    <Header/>
    <Outlet />
    
    </>
  )
}

export default Layout