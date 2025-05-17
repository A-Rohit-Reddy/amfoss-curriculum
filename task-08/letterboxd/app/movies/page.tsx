'use client'
import '../../styles/globals.css'
import styles from './movies.module.css'
import React,{useEffect,useRef,useState} from 'react'
import { Karantina} from 'next/font/google'
import '../../public/hit3.png'
import '../../public/dasara.png'
import '../../public/hi nanna.png'
import '../../public/jersey.png'
import '../../public/saripodhaa.png'
import '../../public/right-arrow.png'
import '../../public/left-arrow.png'
import { Gotu } from 'next/font/google'
import { Akaya_Telivigala } from 'next/font/google'
import Pages from "../../components/pages";
import AppHeader from '../../components/AppHeader'
import LanguageFilters from '../../components/LanguageFilters'
import GenreFilters from '../../components/GenreFilters'
import YearFilter from '../../components/YearFilter'
import VoteFilter from '../../components/VoteFilter'
import RegionFilter from '../../components/RegionFilter'
import { useRouter } from 'next/navigation'

const akaya = Akaya_Telivigala({
    weight: '400',
    subsets: ['latin']
})



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
    const [topRated, setTopRated] = useState([])

    
    const buildQueryParams = () => {
        const params = new URLSearchParams();
      
        if (language) params.append('with_original_language', language);
        if (genre) params.append('with_genres', genre);
        if (year) params.append('primary_release_year', year);
        if (vote) params.append('vote_average.gte', vote);
        if (region) params.append('region', region);
      
        return params.toString();
      };   

    

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

      /* For the Top Rated movies */

    const scrollTopRated = useRef(null)

    const scrollTopRatedLeft = () => {
        scrollTopRated.current.scrollBy({ left: -700, behavior: 'smooth' });
      };
    
      const scrollTopRatedRight = () => {
        scrollTopRated.current.scrollBy({ left: 700, behavior: 'smooth' });
      };

    const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
    const [isGenreDialogOpen, setIsGenreDialogOpen] = useState(false);
    const [isYearDialogOpen, setIsYearDialogOpen] = useState(false);
    const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
    const [isRegionDiaogueOpen, setIsRegionDialogueOpen] = useState(false);
    const [language, setLanguage] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [vote, setVote] = useState('');
    const [region, setRegion] = useState('');

    useEffect(()=>{
        const fetchMovies = async() => {
            const query = buildQueryParams();
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=68880f67ffa63eb0c3f6b210edafb7c9&sort_by=popularity.desc&${query}`);
            const data = await res.json();
            setTrending(data.results);
        }

        const fetchTopRated = async () => {
            const query = buildQueryParams();
            const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=68880f67ffa63eb0c3f6b210edafb7c9&${query}`);
            const data = await res.json();
            setTopRated(data.results);
          };

        fetchTopRated();
        fetchMovies();
    },[language, genre, year , vote, region]) 

    useEffect(() => {
        const LatestMovies = async() => {
            const query = buildQueryParams();
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=68880f67ffa63eb0c3f6b210edafb7c9&sort_by=release_date.desc&${query}`);
            const data = await res.json();
            setLatest(data.results)
        }

        LatestMovies();
    },[language, genre, vote, region, year])



  return (
    <main className='app'>
        <div>
            <AppHeader/>
        </div>
        <div className={styles.layout}>
            <div>
                <div style={{margin: '30px 80px', display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '40px'}}>
                    <div className={akaya.className} style={{color: '#66FCF1', fontSize: '50px', marginRight: '40px'}}>
                        Filter By :
                    </div>
                    <div>
                        <LanguageFilters isDialogOpen={isLanguageDialogOpen} setIsDialogOpen={setIsLanguageDialogOpen} setSelectedLanguage={setLanguage} selectedLanguage={language}/>
                    </div>
                    <div>
                        <GenreFilters isDialogOpen={isGenreDialogOpen} setIsDialogOpen={setIsGenreDialogOpen} setSelectedGenre={setGenre} selectedGenre={genre}/>
                    </div>
                    <div>
                        <YearFilter isDialogOpen={isYearDialogOpen} setIsDialogOpen={setIsYearDialogOpen} setSelectedYear={setYear} selectedYear={year}/>
                    </div>
                    <div>
                        <VoteFilter isDialogOpen={isVoteDialogOpen} setIsDialogOpen={setIsVoteDialogOpen} setSelectedVote={setVote} selectedVotes={vote}/>
                    </div>
                    <div>
                        <RegionFilter isDialogOpen={isRegionDiaogueOpen} setIsDialogOpen={setIsRegionDialogueOpen} setSelectedRegion={setRegion} selectedRegion={region}/>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.section}>
                        <h1 className={karantina.className}>Trending Movies</h1>
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
                        <h1 className={karantina.className}>Latest Movies</h1>
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
                                {Latest.filter(movie=>movie.poster_path).map((movie)=>(
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
                        <h1 className={karantina.className}>Critics' Favourite</h1>
                    </div>
                    <div className={styles.movies}>

                        <div style={{alignContent: 'center', paddingLeft: '30px'}}>
                            <button onClick={scrollTopRatedLeft} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
                                <img
                                src='left-arrow.png'
                                height={90}
                                width={60}
                                className={styles.arrow}
                                />
                            </button>
                        </div>
                        <div ref={scrollTopRated} style={{overflowX: 'auto', gap: '20px', padding: '10px', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'row', msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
                            {topRated.map((movie)=>(
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
                            <button onClick={scrollTopRatedRight} style={{backgroundColor: '#66FCF1', border: 'none', paddingBottom: '60px'}}>
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