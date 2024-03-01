import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
export default function Update() {
    let navigate=useNavigate();
  const value = { name: '', age: '' }
  const [data, setdata] = useState(value)
  const { name, age } = data
  const { id } = useParams()
  function getPosts() {
    const url = `http://localhost:5039/CRUDMinimalAPI/StudentByID?Id=${id}`
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        setdata(postsFromServer)
        setdata((prevData) => {
          console.log(prevData);
          return prevData;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  useEffect(() => {
    getPosts()
  }, [])

  const initialFormData = Object.freeze({
    pid:id,
    name: data.name,
    age: data.age
});
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};
const handleSubmit = (e) => {
    e.preventDefault();
    const postToUpdate = {       
        id: formData.pid,
        name: formData.name,
        age: formData.age
    };   
    const url = `http://localhost:5039/CRUDMinimalAPI/UpdateEmployee/${id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToUpdate)
    })
        .then(response => response.json())
        .then(responseFromServer => {
            console.log(responseFromServer);
        })
       
        navigate("/view_all"); 
};
  return (
    <>
      <form className="w-100 px-5">
            <h1 className="mt-5">Updating the student with name "{data.name}" and age "{data.age}".</h1>
            <div className="mt-5">
                <label className="h3 form-label">Student Name</label>
                <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Student Age</label>
                <input value={formData.age} name="age" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>

           
         <h1></h1>
         
            <NavLink
                   to={'/'}>
                    <button  className="btn btn-dark btn-lg w-100">Cancel</button>
                    </NavLink>
        </form>
    </>
  )
}

