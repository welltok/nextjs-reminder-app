"use client";

import React, {JSX} from "react";
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
              <Link href="/" className={`nav-link  ${navBarStyles.navItemColor} ${pathname === '/' ? navBarStyles.activeLink : ''} d-flex align-items-center`}>
                <Image
                    src={pathname==='/' ? "/icons/home-active.svg" : "/icons/home.svg"}
                    alt="Home Icon"
                    width={18}
                    height={18}
                    className="me-2"
                />
                Home
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/users" className={`nav-link ${navBarStyles.navItemColor} ${pathname === '/users' ? navBarStyles.activeLink : ''} d-flex align-items-center `}>
                <Image
                    src={pathname==='/users' ? "/icons/users-active.svg" : "/icons/users.svg"}
                    alt="Users Icon"
                    width={18}
                    height={18}
                    className="me-2"
                />
                Users
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className={`nav-link d-flex align-items-center ${navBarStyles.navItemColor}`}>
                <Image
                    src="/icons/logout.svg"
                    alt="Logout Icon"
                    width={18}
                    height={18}
                    className="me-2"
                />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
