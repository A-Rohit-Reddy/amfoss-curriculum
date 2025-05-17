"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { username } = useUser();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (username) {
      const stored = localStorage.getItem(`watchlist_${username}`);
      setWatchlist(stored ? JSON.parse(stored) : []);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`watchlist_${username}`, JSON.stringify(watchlist));
    }
  }, [watchlist, username]);

  const addMovie = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeMovie = (id) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
  };

  const value = {
    watchlist, 
    addMovie, 
    removeMovie
  }

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
