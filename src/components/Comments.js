import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, database } from '../firebase/setup'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Comments(props) {

    const [comments,setcomments]=useState("")
    const [newsComments,setNewsComments]=useState([])

    const addComments=async()=>{
        const newsDoc=doc(database,"News",`${props.url.substr(-10,10)}`)
        const commentsRef=collection(newsDoc,"Comments")
        if(!auth.currentUser){
            toast.warning("Please Login")
            return;
        }

        try {
            auth.currentUser && await addDoc(commentsRef,{
                comments:comments,
                name:auth.currentUser.displayName,
                profileImg:auth.currentUser.photoURL
            })
            setcomments("");
            showComments();
            auth.currentUser && toast.success("Comment added successfully")
        } catch (err) {
            console.error(err)
        }
    }

    const showComments=async()=>{
        const newsDoc=doc(database,"News",`${props.url.substr(-10,10)}`)
        const commentsRef=collection(newsDoc,"Comments")

        try {
           const data= await getDocs(commentsRef) 
           const filteredData=data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
           }))
           setNewsComments(filteredData)
        //    console.log(filteredData)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(()=> {
        showComments()
    },[newsComments])

  return (
    <div className='mt-12 ml-4 md:ml-8 p-4 rounded-lg'>
      <div>
        <label htmlFor="comment" class="block my-2 text-xl font-bold text-cyan-700 dark:text-cyan-700">Comments :</label>
            <div className='flex flex-col md:flex-row' >
            <input onChange={(e)=> setcomments(e.target.value)} value={comments} type="text" id="comment" class="bg-gray-50 border border-gray-300 text-black text-md font-serif rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full md:w-80 mb-2 md:mb-0" placeholder="Comment" required />

            <button onClick={addComments} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-0 md:ml-4">Add</button>
            </div>
        </div>
        <div className='h-2 p-4'>
            {newsComments.map((data)=> {
                return <div className='mt-4 flex items-center'>
                <img src={data.profileImg} className='rounded-full w-9 h-9 flex items-center' alt="" />
                <h6 className='ml-2 text-green-300'>{data.name} :</h6>
                <h4 className=' ml-4 flex items-center text-white' key={data.id}>{data.comments}</h4>
                </div>
            })}
        </div>
        <ToastContainer autoClose={3000}/>
    </div>
  )
}
