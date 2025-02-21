"use client";

import React from "react";
import Navbar from "@/components/Narbar/NavBar";
import Users from "@/components/users/Users"

export default function UsersPage(): JSX.Element {
  return (
    <div>
      <Navbar />
      <Users />
    </div>
  );
}
