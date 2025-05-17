import React from 'react'
import '../search/search.css'

const page = () => {
  return (
    <div>
        <div className="container">
            <h1>🎬 Movie Search</h1>
            <input id="searchInput" type="text" placeholder="Search for a movie..." />
            <ul id="suggestions" className="suggestions"></ul>
        </div>
    </div>
  )
}

export default page
