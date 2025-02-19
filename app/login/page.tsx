// pages/login.js
"use client"
// pages/login.tsx
import { useState, FormEvent } from 'react'
import Head from 'next/head'

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // For now, just log the values
    console.log('Email:', email)
    console.log('Password:', password)
    // In real life, you'd call an API or handle auth here
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      {/* Center the login form using Bootstrap utilities */}
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
