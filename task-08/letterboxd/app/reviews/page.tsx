'use client'
import '../../styles/globals.css'
import styles from './reviews.module.css'
import React,{useEffect,useRef,useState} from 'react'
import { useRouter } from 'next/navigation'
import { Karantina} from 'next/font/google'
import '../../public/hit3.png'
import '../../public/dasara.png'
import '../../public/hi nanna.png'
import '../../public/jersey.png'
import '../../public/saripodhaa.png'
import '../../public/right-arrow.png'
import '../../public/left-arrow.png'
import { Gotu } from 'next/font/google'
import Pages from "../../components/pages"
import AppHeader from '../../components/AppHeader'

const gotu = Gotu({
  weight: '400',
  subsets: ['latin']
})

const karantina = Karantina({
  weight: '700',
  subsets: ['latin']
})

const Home = () => {

  /* For search results */

  const [query, setQuery] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=68880f67ffa63eb0c3f6b210edafb7c9&query=${value}`);
    const data = await res.json();
    setSuggestions(data.results.slice(0, 8));
  };

    const router = useRouter();

    const [Trending,setTrending] = useState([])
    const [Latest, setLatest] = useState([])


    useEffect(()=>{
        const fetchMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=68880f67ffa63eb0c3f6b210edafb7c9`);
            const data = await res.json();
            setTrending(data.results);
        }

        const LatestMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=68880f67ffa63eb0c3f6b210edafb7c9&with_original_language=hi&region=IN&sort_by=popularity.desc`);
            const data = await res.json();
            setLatest(data.results);
        }

        LatestMovies();
        fetchMovies();
    },[])
      

    /* For the trending movies */

    const scrollTrend = useRef(null)

    const scrollTrendLeft = () => {
        scrollTrend.current.scrollBy({ left: -700, behavior: 'smooth' });
      };
    
      const scrollTrendRight = () => {
        scrollTrend.current.scrollBy({ left: 700, behavior: 'smooth' });
      };

      /* For the latest movies */

      const scrollLatest = useRef(null)

      const scrollLatestLeft = () => {
        scrollLatest.current.scrollBy({ left: -700, behavior: 'smooth' });
      }

      const scrollLatestRight = () =>{
        scrollLatest.current.scrollBy({ left: 700, behavior: 'smooth' });
      }




  return (
    <main className={styles.app}>
        <div>
            <AppHeader/>
        </div>
        <div className={styles.layout}>
            <div>
                <div className={styles.home}>
                      <div>
                          <div className={styles.container}>
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <input className={styles.searchInput} type="text" placeholder="Search for a movie..." value={query} onChange={handleSearch} />  
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <ul className={styles.suggestions}>
                                  {suggestions.map(movie=>(
                                    <li key={movie.id} onClick={()=>router.push(`/reviews/${movie.id}`)}>
                                      {movie.title}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                          </div>
                      </div>
                    <div className={styles.section}>
                        <h1 className={karantina.className}>Trending Now In Your Region</h1>
                    </div>
                    <div className={styles.movies}>
                            <div style={{alignContent: 'center', paddingLeft: '30px'}}>
                                <button onClick={scrollLatestLeft} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
                                    <img
                                    src='left-arrow.png'
                                    height={90}
                                    width={60}
                                    className={styles.arrow}
                                    />
                                </button>
                            </div>
                            <div ref={scrollLatest} style={{overflowX: 'auto', gap: '20px', padding: '10px', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'row', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
                                {Latest.map((movie)=>(
                                    <div key={movie.id}>
                                        <img 
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        height={320}
                                        width={220}
                                        onClick={()=>router.push(`/reviews/${movie.id}`)}
                                        />
                                        <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>{movie.title}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{alignContent: 'center', paddingRight: '30px'}}>
                                <button onClick={scrollLatestRight} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
                                    <img
                                    src='right-arrow.png'
                                    height={90}
                                    width={60}
                                    className={styles.arrow}
                                    />
                                </button>
                            </div>
                    </div>
                    <div className={styles.section}>
                        <h1 className={karantina.className}>Top Rated Movies</h1>
                    </div>
                    <div className={styles.movies}>

                        <div style={{alignContent: 'center', paddingLeft: '30px'}}>
                            <button onClick={scrollTrendLeft} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
                                <img
                                src='left-arrow.png'
                                height={90}
                                width={60}
                                className={styles.arrow}
                                />
                            </button>
                        </div>
                        <div ref={scrollTrend} style={{overflowX: 'auto', gap: '20px', padding: '10px', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'row', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
                            {Trending.map((movie)=>(
                                <div key={movie.id}>
                                    <img 
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    height={320}
                                    width={220}
                                    onClick={()=>router.push(`/reviews/${movie.id}`)}
                                    />
                                    <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>{movie.title}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{alignContent: 'center', paddingRight: '30px'}}>
                            <button onClick={scrollTrendRight} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
                                <img
                                src='right-arrow.png'
                                height={90}
                                width={60}
                                className={styles.arrow}
                                />
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div style={{alignContent: 'center'}}>
                <Pages/>
            </div>
        </div>
    </main>
  )
}

export default Home