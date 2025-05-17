// app/[id]/page.tsx

import AppHeader from '../../../components/AppHeader';
import styles from './MovieDetail.module.css';
import { notFound } from 'next/navigation';
import Pages from '../../../components/review_page';

async function getMovie(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return res.json();
}

async function getReviews(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_API_KEY}`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results?.slice(0, 10) || [];
}

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);
  const reviews = await getReviews(params.id);

  if (!movie) return notFound();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-poster.png';

  return (
    <>
        <div>
            <AppHeader/>
        </div>
        <div className={styles.layout}>
            <main className={styles.container}>
                <div className={styles.poster}>
                    <img
                    src={posterUrl}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className={styles.image}
                    />
                </div>

                <div className={styles.reviews}>
                    <h1>{movie.title}</h1>
                    <h2>Top Reviews</h2>
                    {reviews.length === 0 ? (
                    <p>No reviews available.</p>
                    ) : (
                    <div className={styles.reviewList}>
                        {reviews.map((review: any) => (
                        <div key={review.id} className={styles.reviewBox}>
                            <div className={styles.meta}>
                            <strong>{review.author}</strong> &middot;{" "}
                            {new Date(review.created_at).toLocaleDateString()}
                            </div>
                            <p>
                            {review.content.length > 600
                                ? review.content.slice(0, 600) + "..."
                                : review.content}
                            </p>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            </main>
            <div style={{alignContent: 'center'}}>
                <Pages/>
            </div>
        </div>
    </>
  );
}

