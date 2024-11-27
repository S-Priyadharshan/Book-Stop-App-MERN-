import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const ShowBook = () => {
  let [book, setBook] = useState({});
  let [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res)=>{
        setBook(res.data);
        setLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      })
  }, [id])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'></h1>
      {loading ? (
      <Spinner/> 
      ) : (
        <div className="max-w-xs rounded overflow-hidden shadow-xl bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{book.title}</div>
          <p className="text-gray-700 text-base mb-2">
            By: {book.author}
          </p>
          <p>
            ISBN: {book.publishYear}
          </p>
        </div>
        <div className="px-6 py-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Fantasy
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Action
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Adventure
          </span>
        </div>
      </div>
      )}
    </div>
  )
}

export default ShowBook