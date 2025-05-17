'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Karantina } from "next/font/google"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"

const karantina = Karantina({
  weight: '700',
  subsets: ['latin'],
})

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {

  const {login} = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.error || "Login failed")
        return
      }

      login(data.username, data.password);

      router.push('/home')  // Redirect after login
    } catch (error) {
      console.error("Login error:", error)
      alert("Server error")
    }
  }

  return (
    <div className={karantina.className} style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username<br />
          <input
            placeholder={errors.username ? "Username is required!" : "Enter your username"}
            className={errors.username ? "error" : "input"}
            type="text"
            {...register('username', { required: true, maxLength: 15 })}
          />
        </label><br />

        <label>
          Password<br />
          <input
            placeholder={errors.password ? "Password is required!" : "Enter your password"}
            className={errors.password ? "error" : "input"}
            type="password"
            {...register('password', { required: true, maxLength: 15 })}
          />
        </label><br />

        <input
          className={karantina.className}
          type="submit"
          value="Login"
          id="submit"
        />
      </form>
    </div>
  )
}

export default LoginForm

