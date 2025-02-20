"use client";
import { useRouter } from "next/navigation";

export default function UsersPage(): JSX.Element {
  const router = useRouter();

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to your users page</h1>
      <p>Here is your private content, accessible only when logged in.</p>
    </div>
  );
}
