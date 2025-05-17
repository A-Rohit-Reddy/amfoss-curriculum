import LoginForm from "../../components/LoginForm"
import React from 'react'
import LoginHeader from '../../components/LoginHeader'
import '../../styles/module.css'
import '../../styles/globals.css'
import styles from './login.module.css'

const Login = () => {
  return (
            <main className={styles.app}>
              <LoginHeader buttonContent='Sign Up'/>
              <LoginForm/>
            </main>
  )
}

export default Login