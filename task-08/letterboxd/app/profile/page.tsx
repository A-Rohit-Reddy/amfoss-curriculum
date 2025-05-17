'use client'
import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { Karantina, Gotu, Goblin_One } from 'next/font/google'
import AppHeader from '../../components/AppHeader'
import { useUser } from '../../context/UserContext'
import { useRouter } from 'next/navigation'

const karantina = Karantina({ weight: '700', subsets: ['latin'] })
const gotu = Gotu({ weight: '400', subsets: ['latin'] })
const goblin = Goblin_One({ weight: '400', subsets: ['latin'] })

interface Review {
  movie_id: string
  review_text: string
  rating: number
  movie_title?: string
  poster_path?: string  
}

interface WatchlistItem {
  movie_id: string
  movie_title: string
  poster_path: string
}

const defaultWatchlist: WatchlistItem[] = [
  {
    movie_id: '001',
    movie_title: 'Jersey',
    poster_path: '/jersey.png',
  },
  {
    movie_id: '002',
    movie_title: 'Saripodhaa Sanivaram',
    poster_path: '/saripodhaa.png',
  },
  {
    movie_id: '003',
    movie_title: 'HIT : THE THIRD CASE',
    poster_path: '/hit3.png',
  },
]

const defaultReviews: Review[] = [
  {
    movie_id: '001',
    movie_title: 'The Dark Knight',
    review_text: 'An intense, gripping superhero masterpiece.',
    rating: 5,
  },
  {
    movie_id: '002',
    movie_title: 'Shutter Island',
    review_text: 'Incredible twists and performances.',
    rating: 4.5,
  },
]

const ProfilePage = ({ refresh }: { refresh: boolean })  => {
  const { username } = useUser()
  const router = useRouter()

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(defaultWatchlist)
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)

  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        console.log('No username found, using default mock data.')
        setWatchlist(defaultWatchlist)
        setReviews(defaultReviews)
        return
      }

      try {
        console.log('Fetching watchlist and reviews for user:', username)
        const [watchlistRes, reviewsRes] = await Promise.all([
          fetch('http://localhost:5000/watchlist/user', {
            method: 'GET',
            credentials: 'include',
          }),
          fetch('http://localhost:5000/reviews/user', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }),
        ])

        const watchlistData = await watchlistRes.json()
        const reviewsData = await reviewsRes.json()

        console.log('Received watchlist data:', watchlistData)
        console.log('Received reviews data:', reviewsData)

        setWatchlist(watchlistData.length > 0 ? watchlistData : defaultWatchlist)
        setReviews(reviewsData.length > 0 ? reviewsData : defaultReviews)
      } catch (error) {
        console.error('Error fetching data:', error)
        setWatchlist(defaultWatchlist)
        setReviews(defaultReviews)
      }
    }

    fetchData()
  }, [username, refresh])

  return (
    <main>
      <AppHeader />
      <div className={styles.home}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <img
            src="/profile-pic.png"
            alt="Profile"
            width={340}
            height={340}
            className={styles.profileImage}
          />
          <div className={`${styles.profileName} ${karantina.className}`}>
            {username || 'Guest'}
          </div>
          <div className={styles.followStats}>
            <button className={styles.btn}>
              Followers:<br />151
            </button>
            <button className={styles.btn}>
              Following:<br />173
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className={`${styles.navButtons} ${karantina.className}`}>
          <button className={styles.button} onClick={() => router.push('/movies')}>
            Movies
          </button>
          <button className={styles.button} onClick={() => router.push('/reviews')}>
            Reviews
          </button>
          <button className={styles.button} onClick={() => router.push('/settings')}>
            Settings
          </button>
        </div>

        {/* Watchlist Section */}
        <div className={styles.section}>
          <h1 className={karantina.className}>My Watchlist</h1>
        </div>
        <div className={styles.movies}>
          {watchlist.map((movie) => (
            <div key={movie.movie_id}>
              <img
                src={movie.poster_path}
                height={220}
                width={160}
                alt={movie.movie_title}
              />
              <div
                className={gotu.className}
                style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '10px' }}
              >
                {movie.movie_title}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className={styles.section}>
          <h1 className={karantina.className}>My Reviews</h1>
        </div>
        <div className={styles.reviewsSection}>
            {reviews.map((review, index) => (
                <div key={index} className={styles.reviewBox}>
                    <img
                        src={review.poster_path?.startsWith('http')
                            ? review.poster_path
                            : `https://image.tmdb.org/t/p/w500${review.poster_path}`
                        }
                        alt={review.movie_title}
                        width={160}
                        height={220}
                        style={{ borderRadius: '8px', marginBottom: '10px' }}
                    />

                    <h2 className={goblin.className}>{review.movie_title}</h2>
                    <p className={gotu.className}>{review.review_text}</p>
                    <p className={gotu.className}>⭐ {review.rating}</p>
                </div>
            ))}
         </div>

      </div>
    </main>
  )
}

export default ProfilePage




