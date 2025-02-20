// pages/login.tsx
"use client"
import { useState, FormEvent, useEffect, JSX } from 'react'
import loginStyles from './login.module.css';
import Image from "next/image";
import Link from "next/link";
import Notification from "../../components/notification/Notification";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthStart } from '@/features/auth/authSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'fail'>('fail');
  const [areCredsValid, setAreCredsValid] = useState<boolean>(true);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');
  const [isForgotPasswordEmailValid, setIsForgotPasswordEmailValid] = useState<boolean>(true);

  const dispatch = useDispatch()
  const router = useRouter();
  const { error, token } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginPayload = {email, password};

    dispatch(fetchAuthStart(loginPayload))
  }

  useEffect(() => {
    if (error) {
      setEmail('');
      setPassword('');
      setAlertType('fail');
      setAlertMessage('Invalid username or password');
      console.log('Invalid username or password');
      setAreCredsValid(false)
    } else if (token) {
      setAlertMessage(null)
      console.log('Login successful');
      router.push('/')
    }
  }, [error, token]);

  const handleForgotPasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    const emailValid = forgotPasswordEmail !== '';

    setIsForgotPasswordEmailValid(emailValid);

    if (emailValid) {
      // Handle forgot password logic (e.g., send reset email)
      console.log('Forgot password email sent');
      setAlertType('success');
      setAlertMessage('If the email exists in our database, you will receive further instructions.');
      setShowForgotPassword(false);
      setForgotPasswordEmail("")
      setAreCredsValid(true)
    }
  };

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
        <div className={`d-flex align-items-center justify-content-center vh-100 bg-light overflow-hidden ${loginStyles.parentContainer}`}>
          {/* Background */}
          <div className={loginStyles.rotatedDivLeft}/>
          <div className={loginStyles.rotatedDivRight}/>
          {/* Logo */}
          <div className={loginStyles.logoContainer}>
            <Image src="/icons/personify_logo.svg" alt="White Logo" width={256} height={100}/>
          </div>
          {/* Login Card */}
          <div className={`card shadow p-4 w-50 text-center`} style={{maxWidth: "468px", height: "518px"}}>
            <div className={loginStyles.loginCardContent}>
              {/* Logo */}
              <div>
                {showForgotPassword && (
                    <div className={loginStyles.backToLoginButton}>
                      <div>
                        <Image src="/icons/back_arrow.svg" alt="BackArrow" width={15} height={15}/>
                      </div>
                      <Link href="#" className="text-decoration-none text-secondary" style={{marginLeft: "10px"}}  onClick={() => setShowForgotPassword(false)}>Back
                        to Login</Link>
                    </div>
                )}
                <div className={loginStyles.iconContainer}>
                  <div className={loginStyles.iconWrapper}>
                    <Image src="/icons/favicon-ph.png" alt="Logo" layout="fill" objectFit="contain"/>
                  </div>
                </div>
              </div>
              {/* Title */}
              <h2 className="fw-bold mb-4">
                {showForgotPassword ? 'Forgot Password' : 'Sign in to PH Intellect'}
              </h2>
              {/* Form */}
              {showForgotPassword ? (
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <div className="text-start mb-4 mt-2">Enter your email and we will send you instructions on how to reset your password.</div>
                    <div className="mb-3 text-start">
                      <label className="form-label">Email</label>
                      <input
                          type="email"
                          className={`form-control ${!isForgotPasswordEmailValid ? loginStyles.inputError : ''}`}
                          required
                          id="forgotPasswordEmail"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit"
                            className={`btn btn-primary ${loginStyles.customButton} ${loginStyles.spacingTop}`}>Reset
                      Password
                    </button>

                  </form>
              ) : (
                  <form onSubmit={handleLogin}>
                    <div className="mb-2 text-start">
                      <label className="form-label">Email</label>
                      <input type="email" className={`form-control ${!areCredsValid ? loginStyles.inputError : ''}`}
                             required
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
                      <Link href="#" className="text-decoration-none text-secondary"
                            onClick={() => setShowForgotPassword(true)}>Forgot Password?</Link>
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className={`btn btn-primary ${loginStyles.customButton}`}>Sign In</button>
                  </form>)}
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
