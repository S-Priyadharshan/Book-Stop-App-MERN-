import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () =>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar("Book Deleted Successfully", {variant: 'success'});
      navigate('/');
    })
    .catch((err)=>{
      setLoading(false);
      console.log(err);
      // alert("An error has occured please check console");
      enqueueSnackbar("Error", {variant: 'error'})
    })
  }
  return (
    <div className="p-4">
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : '' }
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className='text-2xl'>Are you sure you want to delete this book ? </h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook} 
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook