'use client'
import '../../styles/globals.css'
import styles from './home.module.css'
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
import Pages from "../../components/pages";
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

    const router = useRouter();

    const [Trending,setTrending] = useState([])
    const [Latest, setLatest] = useState([])
    const [Upcoming, setUpcoming] = useState([])
    const [carouselMovies, setCarouselMovies] = useState([]);


    useEffect(()=>{
        const fetchMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=68880f67ffa63eb0c3f6b210edafb7c9`);
            const data = await res.json();
            setTrending(data.results);
        }

        const LatestMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=68880f67ffa63eb0c3f6b210edafb7c9`);
            const data = await res.json();
            setLatest(data.results)
        }

        const UpcomingMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=68880f67ffa63eb0c3f6b210edafb7c9`);
            const data = await res.json();
            setUpcoming(data.results);
        }

        const fetchCarouselMovies = async() => {
            const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=68880f67ffa63eb0c3f6b210edafb7c9`);
            const data = await res.json();
            setCarouselMovies(data.results)
        }

        UpcomingMovies();
        LatestMovies();
        fetchMovies();
        fetchCarouselMovies();
    },[])

    useEffect(() => {
        const slider = sliderRef.current;
        const scrollTo = 1220
        slider.scrollLeft = scrollTo;
      }, [carouselMovies]);
    

    useEffect(() => {
        const slider = sliderRef.current;

        const itemWidth = 1420; // width + margin
        let scrollInterval;
      
        const startAutoScroll = () => {
          scrollInterval = setInterval(() => {
            slider.scrollBy({left: itemWidth, behaviour: 'smooth'})
          }, 3000);
        };
      
        startAutoScroll();
      
        return () => clearInterval(scrollInterval);
      }, []);
      

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

      /* For the Upcoming movies */

      const scrollUpcoming = useRef(null)

      const scrollUpcomingLeft = () => {
        scrollUpcoming.current.scrollBy({left: -700, behaviour: 'smooth'})
      }

      const scrollUpcomingRight = () => {
        scrollUpcoming.current.scrollBy({left: 700, behaviour: 'smooth'})
      }

      /* For the auto scroll bar */

      const sliderRef = useRef(null)




  return (
    <main className={styles.app}>
        <div>
            <AppHeader/>
        </div>
        <div className={styles.slider}>
                        <div ref={sliderRef} style={{overflowX: 'scroll', gap: '20px', padding: '10px', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'row', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
                            {[...carouselMovies,...carouselMovies].map((movie,index)=> (
                                <div key={`${movie.id}-${index}`}>
                                    <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={`${movie.title}`}
                                    height={800}
                                    width={1400}
                                    onClick={()=>router.push(`./${movie.id}`)}
                                    />
                                </div>
                            ))}

                        </div>
        </div>
        <div className={styles.layout}>
            <div>
                <div className={styles.home}>
                    <div className={styles.section}>
                        <h1 className={karantina.className}>Now Playing in Theatres</h1>
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
                                        onClick={()=>router.push(`./${movie.id}`)}
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
                                    onClick={()=>router.push(`./${movie.id}`)}
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
                    <div className={styles.section}>
                        <h1 className={karantina.className}>Upcoming Movies</h1>
                    </div>
                    <div className={styles.movies}>

                        <div style={{alignContent: 'center', paddingLeft: '30px'}}>
                            <button onClick={scrollUpcomingLeft} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
                                <img
                                src='left-arrow.png'
                                height={90}
                                width={60}
                                className={styles.arrow}
                                />
                            </button>
                        </div>
                        <div ref={scrollUpcoming} style={{overflowX: 'auto', gap: '20px', padding: '10px', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'row', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
                            {Upcoming.map((movie)=>(
                                <div key={movie.id}>
                                    <img 
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    height={320}
                                    width={220}
                                    onClick={()=>router.push(`./${movie.id}`)}
                                    />
                                    <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>{movie.title}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{alignContent: 'center', paddingRight: '30px'}}>
                            <button onClick={scrollUpcomingRight} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
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