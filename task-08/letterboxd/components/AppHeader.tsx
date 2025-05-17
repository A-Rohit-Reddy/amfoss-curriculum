'use client'
import React,{useRef, useState} from 'react'
import { Kavoon, Karantina } from 'next/font/google'
import styles from '../styles/AppHeader.module.css'
import '../public/search-icon.png'
import '../public/user-icon.png'
import '../public/menu.png'
import { useUser } from '../context/UserContext'
import '../public/user.png'
import '../public/settings.png'
import '../public/help.png'
import { data } from 'react-router-dom'
import { useRouter } from 'next/navigation'

const kavoon = Kavoon({
    weight: '400',
    subsets: ['latin']
})

const karantina = Karantina({
    subsets: ['latin'],
    weight: '700'
})

const AppHeader = () => {

    const {logout} = useUser();

    /* Search functionality */

    const [search, setSearch] = useState([])
    const [suggestions, setSuggestions] = useState([])

    const SearchOnChange = async(e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length < 2){
            setSuggestions([])
            return
        }
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=68880f67ffa63eb0c3f6b210edafb7c9&query=${value}`);
        const data = await res.json();

        setSuggestions(data.results.slice(0,8))
    }

    const route = useRouter();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isClosing, setIsClosing] = useState(false);

    const dialogue = useRef(null);
    
    const {username} = useUser();

  return (
    <>
        <div className={kavoon.className}>
            <div className={styles.loginHeader}>
                <div className={styles.logo}> 
                    <a className={styles.open} href='./home'><h1>LetterboxD</h1></a>
                </div>
                <div className={styles.change}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button className={styles.sign} style={{display: 'flex',flexDirection: 'row'}} onClick={()=>route.push('/profile')}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div>
                                    <img
                                    src='user-icon.png'
                                    height={50}
                                    width={40}
                                    style={{marginTop: '7px',marginRight: '15px', marginLeft: '15px'}}
                                    />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    {username || 'Guest'}
                                </div>
                            </div>
                        </button>
                        <div>
                            <div>
                                <input placeholder='Search for movies....' className={styles.searchsign} value={search} onChange={SearchOnChange}/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute'}}>
                                    <ul className={styles.suggestions}>
                                    {suggestions.map(movie=>(
                                        <li key={movie.id} onClick={()=>route.push(`/${movie.id}`)}>
                                        {movie.title} ({movie.release_date})
                                        </li>
                                    ))}
                                    </ul>
                            </div>
                        </div>
                        <a onClick={()=>{
                             if (!isDialogOpen) {
                                dialogue.current.show();
                                setIsDialogOpen(true);
                              } else {
                                setIsClosing(true);
                                setTimeout(() => {
                                  dialogue.current.close();
                                  setIsDialogOpen(false);
                                  setIsClosing(false);
                                }, 400);
                              }
                        }}>
                            <img
                            src='menu.png'
                            height={100}
                            width={100}
                            style={{marginLeft: '20px'}}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <hr style={{border: '1px solid',color: '#66FCF1'}}/>
        </div>

        <dialog ref={dialogue} className={isClosing ? `${styles.dialogClose} ${styles.dialog}` : (isDialogOpen ? `${styles.dialogOpen} ${styles.dialog}` : '')}>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '40px', marginTop: '60px'}}>
                <div className={styles.menu}>
                    <div>
                        <img 
                            src='settings.png'
                            height={80}
                            width={80}
                        />
                    </div>
                    <div style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bolder'}}>
                        Settings
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        <img 
                            src='help.png'
                            height={80}
                            width={80}
                        />
                    </div>
                    <div style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bolder'}}>
                        Help
                    </div>
                </div>
                <div className={styles.menu}>
                    <div>
                        <img 
                            src='user.png'
                            height={80}
                            width={80}
                        />
                    </div>
                    <div style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bolder'}}>
                        Profile
                    </div>
                </div>
                <div className={karantina.className}>
                    <button className={styles.logout} onClick={async()=>{
                        const res = await fetch('http://127.0.0.1:5000/logout',{
                            method: 'POST',
                            credentials: "include",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })

                        logout();

                        route.push('/login')
                        alert('Logged out successfully')
                        
                    }}>Logout</button>
                </div>
            </div>

        </dialog>
    </>
  )
}

export default AppHeader