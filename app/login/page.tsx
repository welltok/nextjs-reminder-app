// pages/login.tsx
"use client"
import {useState, FormEvent, useEffect, JSX} from 'react'
import styles from "*.module.css";
import loginStyles from './login.module.css';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import Notification from "../../components/notification/Notification";


export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'fail'>('fail');
  const [areCredsValid, setAreCredsValid] = useState<boolean>(true);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // For now, just log the values
    console.log('Email:', email)
    console.log('Password:', password)
    // Basic validation
    const emailValid = email === 'admin@gmail.com';
    const passwordValid = password === 'admin';
    setAreCredsValid(emailValid && passwordValid);

    if (emailValid && passwordValid) {
      // Redirect to dashboard on successful login
      // router.push('/'); // Redirect to dashboard on successful login
      setAlertMessage(null)
      console.log('Login successful');
    } else {
      setAlertType('fail')
      setAlertMessage('Invalid username or password')
      console.log('Invalid username or password');
    }
    // In real life, you'd call an API or handle auth here
  }

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 8000);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light overflow-hidden">
        {/* Background */}
        <div className={loginStyles.rotatedDivLeft}/>
        <div className={loginStyles.rotatedDivRight} />
        {/* Logo */}
        <div className={loginStyles.logoContainer}>
          <Image src="/icons/personify_logo.svg" alt="White Logo" width={256} height={100}/>
        </div>
        {/* Login Card */}
        <div className={`card shadow p-4 w-50 text-center`} style={{maxWidth: "468px"}}>
          <div className={loginStyles.loginCardContent}>
            {/* Logo */}
            <div className={loginStyles.iconContainer}>
              <div className={loginStyles.iconWrapper}>
                <Image src="/icons/favicon-ph.png" alt="Logo" layout="fill" objectFit="contain"/>
              </div>
            </div>
            {/* Title */}
            <h2 className="fw-bold mb-4">
              {'Sign in to PH Intellect'}
            </h2>
            {/* Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-2 text-start">
                <label className="form-label">Email</label>
                <input type="email" className={`form-control ${!areCredsValid ? loginStyles.inputError : ''}`} required
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-2 text-start ">
                <label className="form-label">Password</label>
                <input type="password"
                       className={`form-control ${!areCredsValid ? loginStyles.inputError : ''}`} required
                       id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-2 text-start">
                <Link href="#" className="text-decoration-none text-secondary">Forgot Password?</Link>
              </div>
              {/* Submit Button */}
              <button type="submit" className={`btn btn-primary ${loginStyles.customButton}`}>Sign In</button>
            </form>
          </div>
        </div>
        {/* Notification */}
        {alertMessage && (
          <Notification message={alertMessage} type={alertType}/>
        )}
      </div>
    </>
  )
}
