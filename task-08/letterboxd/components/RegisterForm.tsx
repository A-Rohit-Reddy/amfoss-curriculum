'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Karantina } from "next/font/google"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"

const karantina = Karantina({
  weight: "700",
  subsets: ["latin"],
})

type FormData = {
  username: string
  password: string
  confirmPassword: string
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const router = useRouter()
  const { login } = useUser()

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.error || "Registration failed")
        return
      }

      login(data.username, data.password);
      router.push("/home")  // Change this to your homepage route

    } catch (error) {
      console.error("Registration error:", error)
      alert("Server error")
    }
  }

  return (
    <div className={karantina.className} style={{ display: 'flex', justifyContent: 'center' }}>
      <form style={{ padding: '50px 50px', margin: '75px 0px' }} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username<br />
          <input
            style={{ margin: '15px 0px' }}
            placeholder={errors.username ? "Username is required!" : "Enter username"}
            className={errors.username ? "error" : "input"}
            type="text"
            {...register('username', { required: true, maxLength: 15 })}
          />
        </label><br />
        <label>
          Password<br />
          <input
            style={{ margin: '15px 0px' }}
            placeholder={errors.password ? "Password is required!" : "Enter password"}
            className={errors.password ? "error" : "input"}
            type="password"
            {...register('password', { required: true, maxLength: 15 })}
          />
        </label><br />
        <label>
          Confirm Password<br />
          <input
            style={{ margin: '15px 0px' }}
            type="password"
            placeholder={errors.confirmPassword ? "Confirm your password!" : "Confirm password"}
            className={errors.confirmPassword ? "error" : "input"}
            {...register('confirmPassword', {
              required: true,
              validate: value => value === watch('password') || "Passwords do not match"
            })}
          />
        </label><br />
        {errors.confirmPassword?.message && (
          <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
        )}
        <input
          className={karantina.className}
          type="submit"
          value="Sign Up"
          id="submit"
        />
      </form>
    </div>
  )
}

export default RegisterForm
