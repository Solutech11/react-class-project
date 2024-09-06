import React,{useEffect, useState} from 'react'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import axios from 'axios'
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";


export default function MovieList() {

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/movie/${id}`)
    }



    const [Search, setSearch] = useState('')
    

    //movies
    const [movies, setMovies] = useState([])

    const [movies2, setMovies2] = useState([])
    
    const [fileteredSearch, setfileteredSearch] = useState([])

    async function GetApi(setstate, srch) {
        try {
            let Intigrate= await axios({
                url:`https://www.omdbapi.com/?apikey=ae200cc9&s=${srch}`,
                headers:{
                    Accept:'application/json'
                },
                method:'get'
            })

            setstate(Intigrate.data.Search)
        } catch (error) {
            console.log(error);
            alert("Network error")
        }
    }

    useEffect(() => {
        GetApi(setMovies,'action')
        GetApi(setMovies2,'comedy')

    }, []);

    useEffect(() => {

        if (Search.length>0) {
            let data=[...movies,...movies2]
            let filter= data.filter(i=>((i.Title)?.toUpperCase())?.includes(Search.toUpperCase()))
            return setfileteredSearch(filter)
        }
        setfileteredSearch([])

    }, [Search]);
    
  return (
    <div>
      
      {/* search bar view*/}
      <div className='topBar'>
        <input type='search' value={Search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search movies by name...' />
      
        {Search.length>0&&<ul className='search-wrapper'>
            
            {fileteredSearch.map(i=>(
                <li onClick={()=> handleNavigate(i.imdbID)} key={i.imdbID}>
                    <a>
                        <h4>{i.Title}</h4>
                        <span>{i.Year}</span>
                    </a>
                </li>
            ))}
            


        </ul>}
      </div>

      

    

      {/* Body */}
      <div className='movieBody'>
        {/* popular */}
        <div >
            <h3>Popular</h3>
            
            <br/>
            {/* list */}
            <ul>
                
                {movies.map(i=>(
                    <li onClick={()=> handleNavigate(i.imdbID)} key={i.imdbID}>

                        <img src={i.Poster} />

                        <div className='movieNameContainer'>
                            <h4>{i.Title.length>14?`${i.Title.slice(0,13)}...`:i.Title}</h4>
                            <span>Year: {i.Year}</span>
                        </div>
                        <p className='movieFloater'>90</p>

                    </li>
                ))}
            </ul>
        </div>

        {/* toprated */}
        <div>
            <h3>Top Rated</h3>
            <br/>

            {/* list */}
            <ul>
                
                {movies2.map(i=>(
                    <li onClick={()=> handleNavigate(i.imdbID)} key={i.imdbID}>

                        <img src={i.Poster} />

                        <div className='movieNameContainer'>
                            <h4>{i.Title.length>10?`${i.Title.slice(0,10)}...`:i.Title}</h4>
                            <span>Year: {i.Year}</span>
                        </div>
                        <p className='movieFloater'>90</p>

                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}
