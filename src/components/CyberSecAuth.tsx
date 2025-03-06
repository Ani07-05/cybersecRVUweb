"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createUser, validateUser } from "@/lib/auth"
import styles from "./CyberSecAuth.module.css"

export default function CyberSecAuth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    try {
      if (isSignUp) {
        const result = await createUser({ username, email, password });
        if (result.error) {
          setError(result.error);
          return;
        }
        setMessage("Registration successful! Please log in.");
        setIsSignUp(false);
      } else {
        const user = await validateUser(email, password);
        if (!user) {
          setError("Invalid credentials");
          return;
        }
        window.sessionStorage.setItem('username', user.username || user.email);
        router.push('/dashboard');
      }
    } catch (error: any) {
      setError('Authentication failed');
    }
  }

  return (
    <div className={styles.cyberSecContainer}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qRhVobWjo6H1SFt0hA0T3EOPUOZBuL.png"
        alt="CyberSec Logo"
        width={150}
        height={150}
      />
      <form onSubmit={handleAuth} className={styles.authForm}>
        <div className={styles.formTitle}>{isSignUp ? "Enlist in CyberSec" : "Access CyberSec Portal"}</div>
        {isSignUp && (
          <input
            type="text"
            placeholder="Codename"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={isSignUp}
            className={styles.input}
          />
        )}
        <input
          type="email"
          placeholder="Secure Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Encryption Key"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>
          {isSignUp ? "Initiate Enlistment" : "Authenticate"}
        </button>
        <div className={styles.switchMode} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already enlisted? Login" : "New recruit? Sign up"}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}
      </form>
    </div>
  )
}

