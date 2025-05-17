'use client'
import { useRouter } from "next/navigation"
import Header1 from "../../components/Header1";
import '/styles/globals.css'
import '/styles/start.css'
import { Kavoon } from "next/font/google";

const kavoon = Kavoon({
  weight: '400',
  subsets: ['latin']
})

const Start = () => {
    
    const router = useRouter();
   
    return (
      <main className="app">
        <Header1/>
        <div className="layout">
        <div id="buttons" className={kavoon.className}>
          <button type="button" className="buttonStyle" onClick={() => {
            router.push('./register')
          }}>
            Create an account
          </button>
          <button type="button" className="buttonStyle" onClick={() => {
            router.push('./login')
          }}>
            Login 
          </button>
        </div>
      </div>
      </main>
    )
  }
  
  export default Start