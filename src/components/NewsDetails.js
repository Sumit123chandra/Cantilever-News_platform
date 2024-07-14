import React from 'react'
import { useLocation } from 'react-router-dom'
import Comments from './Comments'

export default function NewsDetails() {

    const location=useLocation()
    const data=location.state?.data
    // console.log(location.state.data)
    if(!data) {
        return (
            <div>
                <h2>No News data Available</h2>
                <p>Please go back for another news details</p>
            </div>
        )
    }
    
    return (<>
        <div className='grid grid-cols-1 md:grid-cols-2 bg-black h-screen'>
            <div className='h-96 md:h p-5'>
                <h1 className='font-extrabold text-2xl text-red-500'>{location.state.data.title}</h1>
                <h4 className='font-serif text-white'>{location.state.data.description}</h4>
                <img src={location.state.data.urlToImage} className='h-2/3 md:h-full rounded-md my-4' alt="" />
                <p className='text-white'>{data.content}</p>
                <a className='text-sky-800 font-semibold underline hover:text-cyan-600' href={location.state.data.url}>Read more</a>
            </div>

            <div className='mt-60 bg-black h-full md:mt-0'>
                <Comments url={location.state.data.url}/>
            </div>
        </div>
    </>
    )
}
