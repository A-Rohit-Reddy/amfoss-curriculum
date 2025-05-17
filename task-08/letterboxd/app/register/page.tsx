import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import LoginHeader from "../../components/LoginHeader";
import '../../styles/globals.css'
import '../../styles/module.css'

const Register = () => {
  return (
    <main>
        <LoginHeader buttonContent="Login"/>
        <RegisterForm/>
    </main>
  )
}

export default Register