'use client';

import styles from './details.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppHeader from '../../components/AppHeader';
import Pages from '../../components/pages';
import { Karantina, Laila } from 'next/font/google';

const karantina = Karantina({ subsets: ['latin'], weight: '400' });
const laila = Laila({ subsets: ['latin'], weight: '400' });

export default function MovieDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState<any>(null);
  const [crew, setCrew] = useState<any>(null);
  const [tmdbReviews, setTmdbReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const apiKey = process.env.TMDB_API_KEY;

      const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      const movieData = await movieRes.json();
      setMovie(movieData);

      const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
      const creditsData = await creditsRes.json();
      setCrew({
        cast: creditsData.cast?.slice(0, 4) || [],
        director: creditsData.crew?.find((person: any) => person.job === 'Director')?.name || 'N/A'
      });

      const reviewsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`);
      const reviewsData = await reviewsRes.json();
      setTmdbReviews(reviewsData.results || []);

      const userReviewRes = await fetch(`http://localhost:5000/review/${id}`);
      const userReviewData = await userReviewRes.json();
      setUserReviews(userReviewData.reviews || []);
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async () => {
    const username = localStorage.getItem('username');
    
    if (!username) {
      alert("Please log in to add a review.");
      return;
    }
  
    if (!reviewText || rating === 0) {
      alert("Please provide both rating and review text.");
      return;
    }
  
    const res = await fetch('http://localhost:5000/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        user: username,
        movie_id: id,
        review: reviewText,
        rating
      })
    });
    
    const text = await res.text();  // Get raw response as text
    console.log("Raw response text:", text);  // Log it
  
    if (res.ok) {
      setReviewText('');
      setRating(0);
      const updated = await res.json();
      setUserReviews(prev => [...prev, updated]);
      alert('Review added !!!');
    } else {
      alert('Failed to submit review.');
    }
  };
  

  const handleAddToWatchlist = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert("Please log in to add to watchlist.");
      return;
    }
  
    const res = await fetch("http://localhost:5000/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        movie_id: movie.id.toString(),
        movie_title: movie.title,
        poster_path: movie.poster_path
      })
    });
  
    const result = await res.json();
    alert(result.message || "Error adding to watchlist");
  };
  
  

  if (!movie) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <>
      <AppHeader />
      <div className={styles.layout}>
        <div className={styles.home}>
          <div style={{ alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#011216',
                color: '#66FCF1',
                margin: '0px 30px',
                padding: '2rem',
                borderRadius: '10px',
                marginBottom: '40px'
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={350}
                style={{ borderRadius: '10px', margin: '20px 80px 20px 40px' }}
              />

              <h1 style={{ marginTop: '1rem', marginLeft: '50px', fontSize: '60px' }} className={karantina.className}>{movie.title}</h1>
              <p style={{ color: 'white', fontSize: '18px', marginLeft: '50px' }}>
                Release Date: {movie.release_date}<br />
                Director: {crew?.director}<br />
                Language: {movie.spoken_languages?.map((l) => l.english_name).join(', ')}<br />
                Genres: {movie.genres?.map((g) => g.name).join(', ')}<br />
                Runtime: {movie.runtime} min
              </p>
            </div>
            <div className={karantina.className}>
              <button onClick={handleAddToWatchlist} className={styles.buttons}>Add to Watchlist</button>
            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}>
            <div style={{ backgroundColor: '#D9FEF9', border: '3px solid #000000', padding: '20px 40px', marginBottom: '40px' }}>
              <p className={laila.className} style={{ fontSize: '20px' }}>
                <strong>Rating:</strong> {movie.vote_average} / 10 <br />
                <strong>Runtime:</strong> {movie.runtime} min<br />
                <strong>Languages:</strong> {movie.spoken_languages?.map((l) => l.english_name).join(', ')}<br />
                <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(', ')}<br /><br />
                <strong>Overview:</strong><br />
                {movie.overview}
              </p>

              <div style={{ marginTop: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ height: '100%', marginLeft: '7px' }}><h1>Top Cast:</h1></div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexDirection: 'row',
                  flex: '1 1 0',
                  alignItems: 'flex-start',
                  columnGap: '40px'
                }}>
                  {crew?.cast?.map((actor) => (
                    <div key={actor.id} style={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1 1 0'
                    }}>
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          width={150}
                          height={160}
                          style={{
                            borderRadius: '20px',
                            margin: 'auto',
                            display: 'block',
                            justifySelf: 'flex-start',
                            border: '5px solid black'
                          }}
                        />
                      ) : (
                        <div />
                      )}
                      <div style={{
                        fontSize: '1rem',
                        marginTop: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bolder'
                      }}>
                        {actor.name}
                        <br />
                        <em>as {actor.character}</em>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ User + TMDB Reviews Section */}
                <div style={{ marginTop: '40px' }}>
                  <h2 style={{ marginBottom: '10px' }}>Reviews</h2>

                  {/* Star rating input */}
                  <div style={{ marginBottom: '10px' }}>
                    <label><strong>Rating: </strong></label>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: star <= rating ? '#FFD700' : '#ccc',
                          marginRight: '5px',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <textarea
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{
                      backgroundColor: '#D9FEF9',
                      border: '3px solid #000000',
                      boxSizing: 'border-box',
                      width: '100%',
                      resize: 'none',
                      height: '100px',
                      marginBottom: '10px'
                    }}
                  />
                  <button onClick={handleReviewSubmit} className={styles.buttons}>Submit Review</button>

                  {/* Scrollable Reviews */}
                  <div
                    style={{
                      marginTop: '20px',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      padding: '10px',
                      backgroundColor: '#f0f0f0',
                      border: '2px solid #000',
                      borderRadius: '8px'
                    }}
                  >
                    {[...userReviews, ...tmdbReviews].map((r: any, i: number) => (
                      <div key={i} style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #aaa' }}>
                        <strong>{r.username || r.author}</strong>:<br />
                        <span style={{ color: '#FFD700' }}>
                          {'★'.repeat(r.rating || Math.round(r.author_details?.rating || 0))}
                        </span>
                        <br />
                        <span>{r.review || r.content}</span>
                      </div>
                    ))}
                    {[...userReviews, ...tmdbReviews].length === 0 && <p>No reviews yet.</p>}
                  </div>
                </div>

            </div>
          </div>
        </div>

        <div style={{ alignContent: 'center' }}>
          <Pages />
        </div>
      </div>
    </>
  );
}







