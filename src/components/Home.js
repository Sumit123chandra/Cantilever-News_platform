import React, { useEffect, useState } from 'react'
// import placeholderimg from '../images/placeholderimg.png'
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { database } from '../firebase/setup';

function Home(props) {

    const [news,setNews]=useState([])


    const addNews=async(data)=>{
        const newsDoc=doc(database,"News",`${data.url.substr(-10,10)}`)
        try {
            await setDoc(newsDoc,{
                title:data.title,
                description:data.description
            })
        } catch (err) {
            console.error(err)
        }
    }

    const getNews=()=>{
        // fetch("https://newsapi.org/v2/everything?q=Apple&from=2024-07-10&sortBy=popularity&apiKey=c62144ea3e874c3ab4582e58d94d5a86")
        fetch(`https://newsapi.org/v2/${props.menu?props.menu:"everything?q=All"}&apiKey=c62144ea3e874c3ab4582e58d94d5a86`)
        // fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c62144ea3e874c3ab4582e58d94d5a86`)
        // fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=c62144ea3e874c3ab4582e58d94d5a86`)

        .then(res=>res.json())
        .then(json=>{
            const filteredArticles=json.articles.filter(article=>
                !article.title.includes("Removed") ||
                !article.description.includes("Removed") 
            );
            setNews(filteredArticles);
        })
        .catch(error=>console.error("Error fetching news: ",error));
        setNews([]);
    }

useEffect(()=>{
    getNews()
},[props.menu])



  return (
    <div className='mt-20 md:mt-16 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-slate-800'>
      {news?.filter(data=>data.title.toLowerCase().includes(props.search.toLowerCase())).map((data,index)=>{
        return <>
        <Link onClick={()=>addNews(data)} key={index} to="/details" state={{data:data}}>
            <div key={index} class="max-w-sm m-4 overflow-hidden shadow-lg rounded-xl bg-white bg-opacity-45">
                <img class="w-full bg-clip-border rounded-xl p-2 shadow-blue-gray-500/40" src={data.urlToImage } alt=""/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2 text-blue-gray-900 leading-snug">{data.title}</div>
                    <p class="text-base text-gray-100">
                    {data.description}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    {data.tags?.map((tag,idx)=>(
                        <span key={idx} className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                            #{tag}
                        </span>
                    ))}
                    <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                        #news
                    </span>
                    <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                        #latest
                    </span>
                </div>
            </div> 
        </Link>

        {/* <div class="relative mt-6 h-5/6 flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80">
            <div
                class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img
                src={data.urltoImage}
                alt="card-image" />
            </div>
            <div class="p-6">
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {data.id}
                </h5>
                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {data.content}
                </p>
            </div>
            <div class="p-6 pt-0">
                <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button">
                Read More
                </button>
            </div>
        </div>  */}
        </>
      })}
    </div>
  )
}

export default Home
