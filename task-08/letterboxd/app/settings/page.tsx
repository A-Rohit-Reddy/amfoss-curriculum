'use client'
import React from 'react'
import styles from './settings.module.css'
import { useRouter } from "next/navigation"
import AppHeader from "../../components/AppHeader"
import Pages from "../../components/pages"
import '/styles/globals.css'
import '../../public/profile-pic.png'
import { Karantina, Kavoon } from "next/font/google";
import { Londrina_Solid } from 'next/font/google'
import { useUser } from '../../context/UserContext'

const lond = Londrina_Solid({
    weight: '900',
    subsets: ['latin']
})

const karantina = Karantina({
    subsets: ['latin'],
    weight: '700'
})

const kavoon = Kavoon({
  weight: '400',
  subsets: ['latin']
})

const Start = () => {

    const {username} = useUser();
    
    const router = useRouter();

    const handleUsernameChange = async () => {
        const oldUsername = (document.getElementById('old-username') as HTMLInputElement)?.value
        const newUsername = (document.getElementById('new-username') as HTMLInputElement)?.value
        const confirmUsername = (document.getElementById('confirm-username') as HTMLInputElement)?.value
      
        if (newUsername !== confirmUsername) {
          alert("New username and confirmation do not match")
          return
        }
      
        try {
          const res = await fetch('http://localhost:5000/user/update-username', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ old_username: oldUsername, new_username: newUsername, confirm_username: confirmUsername }),
          })
      
          const data = await res.json()
          alert(data.message)
        } catch (error) {
          console.error(error)
          alert("Error updating username")
        }
      }
      
      const handlePasswordChange = async () => {
        const oldPassword = (document.getElementById('old-password') as HTMLInputElement)?.value
        const newPassword = (document.getElementById('new-password') as HTMLInputElement)?.value
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement)?.value
      
        if (newPassword !== confirmPassword) {
          alert("New password and confirmation do not match")
          return
        }
      
        try {
          const res = await fetch('http://localhost:5000/user/update-password', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword }),
          })
      
          const data = await res.json()
          alert(data.message)
        } catch (error) {
          console.error(error)
          alert("Error updating password")
        }
      }
      
   
    return (
      <main className="app">
        <div>
            <AppHeader/>
        </div>
        <div className={styles.layout}>
            <div className={styles.home}>
                <div className={styles.settingsContent}>
                    <div className={styles.profileSection}>
                        <div className={styles.profilePic}>
                            <img
                            height={300}
                            width={300}
                            src='profile-pic.png'
                            />
                            {username ||'Guest'}
                        </div>
                    </div>
                    
                    <div className={styles.formsSection}>
                        <div className={`${styles.formGroup} ${styles.formGroupDivider}`}>
                            <h2 className={lond.className} style={{letterSpacing: '2px', fontSize: '55px'}}>Change Username</h2>
                            <label style={{fontSize: '25px'}} className={karantina.className}>
                                Old Username
                                <input type="text" placeholder="Old Username" id='old-username'/>
                            </label>
                            <label style={{fontSize: '25px'}} className={karantina.className}>
                                New Username
                                <input type="text" placeholder="New Username" id='new-username'/>
                            </label>
                            <label style={{fontSize: '25px'}} className={karantina.className}>
                                Confirm Username
                                <input type="text" placeholder="Confirm Username" id='confirm-username'/>
                            </label>
                            <button className={styles.updateBtn} onClick={handleUsernameChange}>Update Username</button>
                        </div>
                        <div className={styles.formGroup}>
                            <h2 className={lond.className} style={{letterSpacing: '2px', fontSize: '55px'}}>Change Password</h2>
                            <label style={{fontSize: '25px'}} className={karantina.className}>
                                Old Password
                                <input type="text" placeholder="Old Username" id='old-password'/>
                            </label>
                            <label style={{fontSize: '25px'}} className={karantina.className}>
                                New Password
                                <input type="text" placeholder="New Username" id='new-password'/>
                            </label>
                            <label style={{fontSize: '25px'}} className={karantina.className}>
                                Confirm Password
                                <input type="text" placeholder="Confirm Username" id='confirm-password'/>
                            </label>
                            <button className={styles.updateBtn} onClick={handlePasswordChange}>Update Password</button>
                        </div>
                    </div>

                    
                </div>
                <button className={styles.logoutBtn}>Logout</button>
            </div>
            <div style={{alignContent: 'center'}}>
                <Pages/>
            </div>
        </div>
      </main>
    )
  }
  
  export default Start