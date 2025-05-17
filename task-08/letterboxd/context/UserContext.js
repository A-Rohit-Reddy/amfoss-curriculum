'use client'
import React,{useState,useContext, useEffect} from 'react'

const UserContext = React.createContext();

export const UserProvider = ({children}) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    useEffect(() => {
      const stored = localStorage.getItem("username");
      if (stored) setUsername(stored);
    }, []);
  
    const login = (name, password) => {
      setUsername(name);
      setPassword(password)
      localStorage.setItem("username", name);
    };
  
    const logout = () => {
      setUsername("");
      setPassword(password)
      localStorage.removeItem("username");
    };

    const value={
        username,
        password,
        login,
        logout
    }

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);