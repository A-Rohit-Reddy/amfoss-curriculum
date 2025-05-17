'use client'
import React, {useRef, useState, useEffect} from 'react'
import { Irish_Grover } from 'next/font/google'
import { Kavoon } from 'next/font/google'

const irish = Irish_Grover({
    weight: '400',
    subsets: ['latin']
})

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400'
})

import '../public/cancel.png'

import styles from '../app/movies/movies.module.css'
import '../styles/filterButtons.css'

/*const GenreFilters = ({onSelectGenre}) => {

    const [genres,setGenres] = useState([])
    const [selected,setSelected] = useState('')

    useEffect(() => {
      const fetchGenres = async() => {
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=68880f67ffa63eb0c3f6b210edafb7c9')
        const data = await res.json()
        setGenres(data.genres)
        
      };
    
      fetchGenres();
    }, [])
    

    const handleChange = (e) => {
        setSelected(e.target.value);
        onSelectGenre(e.target.value);
      }

  return (
    <div>
        <select value={selected} onChange={handleChange} className={irish.className} style={{backgroundColor: '#66FCF1', width: '160px', height: '60px', textAlign: 'center', borderRadius: '20px', color: '#022541', fontSize: '20px'}}>
            <option value="" disabled hidden>
                Genre
            </option>
            {genres.map(genre => (
                <option key= {genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    </div>
  )
}*/

const GenreFilters = ({isDialogOpen, setIsDialogOpen, setSelectedGenre, selectedGenre}) => {

  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async() => {
      const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=68880f67ffa63eb0c3f6b210edafb7c9')
      const data = await res.json()
      setGenres(data.genres);
      console.log('Fetched Genres:', data.genres)
    };
  
    fetchGenres();
  }, [])

  const handleClick = () => {
    if(!isDialogOpen){
      dialogRef.current.showModal();
      setIsDialogOpen(true)
    }else{
      setIsClosing(true)
      setTimeout(() => {
        dialogRef.current.close();
        setIsDialogOpen(false);
        setIsClosing(false)
      },400)
    }
  }

  const handleSelect = (genre) => {
    setSelectedGenre(genre);
    setIsClosing(true);
    setTimeout(() => {
      dialogRef.current.close();
      setIsDialogOpen(false);
      setIsClosing(false)
    },400)
  }

  const buttonText = (genre) => {
    const select = genres.find((l) => l.code === genre)
    return select? `${select}  ▼` : 'Genre'
  }


  return(
    <>
      <button className={styles.filterBy} onClick={handleClick}>
        {buttonText(selectedGenre)}
      </button>


      <dialog ref={dialogRef}  className={isClosing ? 'dialog-slide-close' : (isDialogOpen ? 'dialog-slide-open' : '')}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>
            <h2 style={{color: '#022541', textAlign: 'center', fontSize: '45px', marginBottom: '50px', marginLeft: '790px'}} className={kavoon.className}>Genres</h2>
          </div>
          <div style={{paddingLeft: '100px'}}>
            <button onClick={handleClick} style={{backgroundColor: '#66FCF1', border: 'none'}}>
              <img 
              src='cancel.png'
              width={60}
              height={60}
              />
            </button>
          </div>
        </div>
        <div className='filter-grid'>
          {genres.map((genre)=>(
            <div className={irish.className} key={genre.id} >
              <button className='filter-button' onClick={() => handleSelect(genre.id)}>
                {genre.name}
              </button>
            </div>
          ))}
        </div>
      </dialog>
    </>
  )
}


export default GenreFilters;