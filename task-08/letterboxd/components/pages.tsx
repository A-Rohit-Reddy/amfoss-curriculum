'use client'

import React from 'react'
import { Karantina } from 'next/font/google'
import '../styles/pages.css'
import {useRouter} from 'next/navigation'

const karantina = Karantina({
    weight: '700',
    subsets: ['latin']
})

const Pages = () => {
    const router = useRouter();


  return (
    <div className={karantina.className} style={{display: 'grid', rowGap: '50px'}}>
        <div>
            <button className='button' onClick={() =>
                router.push('./movies')
            }>
                Movies
            </button>
        </div>
        <div>
            <button className='button' onClick={() => {
                router.push('./settings')
            }}>
                Settings
            </button>
        </div>
        <div>
            <button className='button' onClick={() => {
                router.push('./reviews')
            }}>
                Reviews
            </button>
        </div>
        <div>
            <button className='button' onClick={() => {
                router.push('./profile')
            }}>
                Profile
            </button>
        </div>
    </div>
  )
}

export default Pages