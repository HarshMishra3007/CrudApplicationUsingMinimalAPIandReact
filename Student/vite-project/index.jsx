import React from 'react'
import ReactDOM from 'react-dom/client'
import About from './Components/About'
import Layout from './Layout'
import Home from './Components/Home'
import ViewAll from './Components/ViewAll'
import CreateNew from './Components/CreateNew'
import PostUpdateForm from './Components/PostUpdateForm'

import { useState } from 'react';
// import App from './App.jsx'
// import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import Layout from './Layout.jsx'
// import Home from './components/Home/Home.jsx'
// import About from './components/About/About.jsx'
// import Contact from './components/Contact/Contact.jsx'
// import User from './components/User/User.jsx'
// import Github, { githubInfoLoader } from './components/Github/Github.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "view_all",
        element: <ViewAll />
      },
      {
        path:"create_new",
        element:<CreateNew/>
      },
      {
        path:"update/:id",
        element:<PostUpdateForm/>
      }
     

    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)