'use client';
import React, { useEffect, useState } from 'react';
import LanguageFilters from '../../components/LanguageFilters'; // adjust path if needed

const IndianLanguageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState('hi'); // Default to Hindi

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=68880f67ffa63eb0c3f6b210edafb7c9&with_original_language=${language}&with_origin_country=IN&sort_by=popularity.desc`
      );
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [language]);

  return (
    <div>
      <h1>Filter by Language</h1>
      <LanguageFilters onSelectLanguage={setLanguage} />

      <div className="movie-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map(movie => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ borderRadius: '10px' }}
            />
            <p style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '10px' }}>
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndianLanguageMovies;
