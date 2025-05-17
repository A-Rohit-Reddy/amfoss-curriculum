// app/components/Header1.tsx (or wherever you have it)
import { Kavoon } from 'next/font/google'
import React from 'react'

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400', // You can specify weight if needed
})

const Header1 = () => {
  return (
    <div className='header1'>
      <h1>LetterboxD</h1>
      <hr style={{border: '1px solid'}}/>
    </div>
  )
}



export default Header1