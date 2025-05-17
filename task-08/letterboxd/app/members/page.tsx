import React from 'react'
import styles from './members.module.css'
import { Karantina } from 'next/font/google'
import '../../public/hit3.png'
import '../../public/dasara.png'
import '../../public/hi nanna.png'
import '../../public/jersey.png'
import '../../public/saripodhaa.png'
import '../../public/right-arrow.png'
import '../../public/left-arrow.png'
import { Gotu } from 'next/font/google'
import Pages from '../../components/pages'
import AppHeader from '../../components/AppHeader'
import '../../styles/globals.css'

const gotu = Gotu({
  weight: '400',
  subsets: ['latin']
})

const karantina = Karantina({
  weight: '700',
  subsets: ['latin']
})

const Home = () => {
  return (
    <main className='app'>
      <div>
        <AppHeader/>
      </div>
      <div className={styles.layout}>
        <div className={styles.home}>
      <div className={styles.section}>
        <h1 className={karantina.className}>Film Lovers and Popular Critics</h1>
      </div>
      <div className={styles.movies}>

        <div style={{alignContent: 'center', paddingLeft: '30px'}}>
          <img
          src='left-arrow.png'
          height={90}
          width={60}
          className={styles.arrow}
          />
          
        </div>
        <div>
          <img
           src='hit3.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            HIT THE THIRD CASE
           </div>
        </div>
        <div>
          <img
           src='dasara.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            DASARA
           </div>
        </div>
        <div>
          <img
           src='hi nanna.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            HI NANNA
           </div>
        </div>
        <div>
          <img
           src='saripodhaa.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            SARIPODHAA SANIVARAM
           </div>
        </div>
        <div>
          <img
           src='jersey.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            JERSEY
           </div>
        </div>
        <div style={{alignContent: 'center', paddingRight: '30px'}}>
          <img
          src='right-arrow.png'
          height={90}
          width={60}
          className={styles.arrow}
          />
        </div>
        
      </div>
      <div className={styles.section}>
        <h1 className={karantina.className}>Friends and People you follow</h1>
      </div>
      <div className={styles.movies}>

        <div style={{alignContent: 'center', paddingLeft: '30px'}}>
          <img
          src='left-arrow.png'
          height={90}
          width={60}
          className={styles.arrow}
          />
        </div>
        <div>
          <img
           src='hit3.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            HIT THE THIRD CASE
           </div>
        </div>
        <div>
          <img
           src='dasara.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            DASARA
           </div>
        </div>
        <div>
          <img
           src='hi nanna.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            HI NANNA
           </div>
        </div>
        <div>
          <img
           src='saripodhaa.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            SARIPODHAA SANIVARAM
           </div>
        </div>
        <div>
          <img
           src='jersey.png'
           height={320}
           width={220}
           />
           <div className={gotu.className} style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
            JERSEY
           </div>
        </div>
        <div style={{alignContent: 'center', paddingRight: '30px'}}>
          <img
          src='right-arrow.png'
          height={90}
          width={60}
          className={styles.arrow}
          />
        </div>
        
      </div>
        </div>
        <div style={{alignContent: 'center'}}>
          <Pages/>
        </div>
      </div>
    </main>
  )
}

export default Home