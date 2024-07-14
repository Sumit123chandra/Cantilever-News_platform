import React, { useState } from 'react'
import logo from '../images/logo.png'
import signinlogo from '../images/signinlogo.png'
import searchimg from '../images/searchimg.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth'

export default function Navbar(props) {

    const navigate=useNavigate()
    const [isMenuOpen,setIsMenuOpen]=useState(false);

    const logout=async()=> {
        try {
            await signOut(auth);
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }
    console.log(auth)

    const togglemenu=()=> {
        setIsMenuOpen(!isMenuOpen);
    }

  return (
    <div className=' grid grid-cols-1 md:grid-cols-3 bg-black text-white fixed w-full'>
        <div className='flex items-center p-2 justify-between md:justify-start'>
            <img src={logo} alt="" className='h-12 my-auto rounded-md'/>

            <button onClick={togglemenu} className='md:hidden'>
                <svg className="w-8 h-8" fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {auth.currentUser?<button onClick={logout} className='text-white flex items-center justify-center ml-4 hover:border border-b-blue-700 w-auto md:w-48 hover:rounded-md text-2xl'>
                    Logout
                </button>:
                <Link to='/signin'>
                <button className='text-white flex items-center ml-4 hover:border border-blue-700 w-auto md:w-48 hover:rounded-md '>
                    <img src={signinlogo} alt="" className='bg-white rounded-full h-10 w-10 mr-2'/>
                    Sign in
                </button>
            </Link>}
        </div>

        <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:bg-black md:flex-row flex-col mt-2`}>
            <button onClick={()=>props.setMenu("everything?q=All")} className='ml-2 font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline'>Home</button>
            <button onClick={()=>props.setMenu("top-headlines?country=in")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>India</button>
            <button onClick={()=>props.setMenu("everything?q=Science")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>Science</button>
            <button onClick={()=>props.setMenu("everything?q=Movies")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>Movies</button>
            <button onClick={()=>props.setMenu("everything?q=Worklife")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>Worklife</button>
            <button onClick={()=>props.setMenu("everything?q=Travel")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>Travel</button>
            <button onClick={()=>props.setMenu("everything?q=Future")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>Future</button>
            <button onClick={()=>props.setMenu("everything?q=Culture")} className='font-semibold text-sm bg-transparent p-2 my-2 active:text-yellow-300 hover:bg-blue-400 hover:text-white rounded-md focus:outline-none active:underline active:underline-white'>Culture</button>
        </div>

        <div className='flex items-center justify-center md:justify-start ml-2 md:ml-56 p-2 md:p-4 w-full md:w-auto'>
        <img src={searchimg} alt="" className='h-7 '/>
            <input onChange={(e)=>props.setSearch(e.target.value)} placeholder='Search News' className='ml-2 bg-slate-700 border-b-2 border-white hover:border-blue px-2 w-1/2 md:w-auto'></input>
        </div>
    </div>
  )
}
