"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function UsersPage(): JSX.Element {
  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
        {/* Logo + Brand */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/personify_logo.png"
            alt="Personify Health Logo"
            width={150}
            height={40}
          />
        </Link>

        {/* Navigation Links */}
        <div className="ms-auto">
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3">
              <Link href="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link href="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/logout" className="nav-link">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
