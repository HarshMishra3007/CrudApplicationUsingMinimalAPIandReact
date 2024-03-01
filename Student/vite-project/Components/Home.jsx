import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';

export default function Home() {
    const [posts, setPosts] = useState([]);
    function getPosts(){
    
        const url = 'http://localhost:5039/CRUDMinimalAPI/Students';
        
        fetch(url, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(postsFromServer => {
            setPosts(postsFromServer);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
        }

  return (

   

    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        {getPosts()}


    <NavLink 
    to={`/view_all`}
      >  <button type="button" class="btn btn-primary btn-lg px-4 gap-3">View Students</button>
                                </NavLink>


                                <NavLink 
    to={`/create_new`}
      >  <button type="button" class="btn btn-secondary btn-lg px-4 gap-3">Student Management</button>
                                </NavLink>





                             
                       
  </div>



  )
}
