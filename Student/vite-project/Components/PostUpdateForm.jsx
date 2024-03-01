import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Update from '../../service/Update';
export default function PostUpdateForm() {
  return (
    <> 
    <Update />
    </>
  )
}