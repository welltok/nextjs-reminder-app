"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { authLogOut } from "@/features/auth/authSlice";
import { usePathname } from 'next/navigation'
import navBarStyles from './navbar.module.css';


export default function Navbar(): JSX.Element {
  const dispatch = useDispatch()
  const pathname = usePathname()


  const handleLogout = () => {
    dispatch(authLogOut())
  }
  
  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Top Navbar */}
      <nav className={`${navBarStyles.navbarFont} navbar navbar-expand-lg navbar-light bg-white border-bottom px-3`}>
        {/* Logo + Brand */}
        <Link href="/" className={`navbar-brand d-flex align-items-center`}>
          <Image
            src="/icons/personify_logo_blue.svg"
            alt="Personify Health Logo"
            width={150}
            height={40}
          />
        </Link>

        {/* Navigation Links */}
        <div className="ms-auto">
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3">
              <Link href="/" className={`nav-link ${pathname === '/' ? navBarStyles.activeLink : ''}`}>
                Home
              </Link>
            </li> 
            <li className="nav-item me-3">
              <Link href="/users" className={`nav-link  ${pathname === '/users' ? navBarStyles.activeLink : ''}`}>
                Users
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className={`nav-link`}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
