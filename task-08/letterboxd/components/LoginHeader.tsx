'use client'

import { Kavoon } from 'next/font/google'
import React from 'react'

import '../styles/LoginHeader.css'
import { useRouter } from 'next/navigation'

const kavoon = Kavoon({
  subsets: ['latin'],
  weight: '400', // You can specify weight if needed
})

const LoginHeader = ({
  buttonContent
} : {
  buttonContent? : string;
}) => {

  const router = useRouter();

  return (
    <div className={kavoon.className}>
      <div className='loginHeader'>
        <div  className='logo'>
            <h1>LetterboxD</h1>
        </div>
        <div className='change'>
            <button className='signUp' onClick={() => {
              if(buttonContent == 'Login'){
                router.push('./login')
              } if (buttonContent == 'Sign Up'){
                router.push('./register')
              } 
            }}>
                {buttonContent}
            </button>
        </div>
      </div>
      <hr style={{border: '1px solid',color: '#66FCF1'}}/>
    </div>
  )
}

export default LoginHeader