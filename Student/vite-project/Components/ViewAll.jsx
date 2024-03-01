
import React from 'react'
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import { useNavigate } from "react-router-dom";
import About from './About';

export default function ViewAll() {
  let navigate = useNavigate();
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        // Update the document title using the browser API
        getPosts();
      },[]);
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


            function deletePost(id) {
              const url = `http://localhost:5039/CRUDMinimalAPI/DeleteEmployee/${id}`;
               fetch(url, {
                 method: 'DELETE'
               })
               
                 .then(responseFromServer => {
                   console.log(responseFromServer);
                  // onPostDeleted(id);
                  
                 })
                 .catch((error) => {
                   console.log(error);
                   alert(error);
                 });
                 getPosts();
             }
             const handleUpdate = (post) => {
              console.log(post);
              navigate(`/update/${post.id}`); 
             
          };
           
          function renderPostsTable() {
            
           
                return (
               
                   
                  <div className="table-responsive mt-5">
                    <table className="table table-bordered border-dark">
                      <thead>
                        <tr>
                          <th scope="col">Student Id </th>
                          <th scope="col">Student Name</th>
                          <th scope="col">Student Age</th>
                          <th scope="col">Student Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr key={post.id}>
                            <th scope="row">{post.id}</th>
                            <td>{post.name}</td>
                            <td>{post.age}</td>
                            <td>
                            
                            <button onClick={
                              ()=>{
                                handleUpdate(post);
                              }
                            } className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                            
                            <button onClick={() => { if(window.confirm(`Are you sure you want to delete the student named "${post.name}"?`)) deletePost(post.id) }} className="btn btn-secondary btn-lg">Delete</button>
                      
                      
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                   <NavLink
                   to={'/'}>
                    <button  className="btn btn-dark btn-lg w-100">Go Back</button>
                    </NavLink>
                  </div>
                );
              }
            
              
  return (
    <>
   {renderPostsTable()}
    </>
  )
}

