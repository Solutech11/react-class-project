import axios from 'axios'
import React,{useEffect, useState} from 'react'

export default function BookList() {

  const [Loading, setLoading] = useState(false)

  const [books, setBooks] = useState([])


  async function GetApi() {
    setLoading(true)
    try {
      let Intigration= await axios({
        url:"https://openlibrary.org/search.json?q=drama",
        method:'get',
        headers:{
          Accept:'application/json'
        }
      })

      setBooks(Intigration.data.docs)
    } catch (error) {
      console.log(error);
      alert("Error Occured")
    }finally{setLoading(false)}
  }

  useEffect(() => {
    GetApi()
  }, []);
  return (
    <div className='bookContainer'>
      
      <h1 style={{color:'white'}}>Library Repo</h1>
      {/* input search */}
      <div className='SearchSectionLibrary'>
        <input type='search' placeholder='Search books..' />
      </div>

      <div className='hr'/>
    
      {/* items */}
      {Loading?(
        <div style={{flex:1, display:'flex', justifyContent:"center", alignItems:'center', height:'100%'}}>
          <div className="loader"></div>
        </div>
      ):(
        books.length<0?(
          <div style={{flex:1, display:'flex', justifyContent:"center", alignItems:'center'}}>
            <h4>No search result found</h4>
          </div>
        ):(
          <ul className='LibraryListStyle'>
              <li>
                <img src={require('../assets/1.jpg')} />
                <div>
                  <h3>Yodlehi book</h3>
                  <span>2024 . 3.5 <span style={{color:'gold'}}>&#9733;</span></span>
                </div>
              </li>
            
          </ul>
        )
      )}
      

        


    </div>
  )
}
