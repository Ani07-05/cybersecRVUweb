"use client"

import { useState, useEffect } from "react"
import type { SupabaseClient, User } from "@supabase/supabase-js"
import Image from "next/image"
import styles from "./CyberSecAuth.module.css"

interface CyberSecAuthProps {
  supabase: SupabaseClient
}

export default function CyberSecAuth({ supabase }: CyberSecAuthProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setMessage("Check your email in 2-5 mins for the confirmation link!")
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        setMessage("Access granted. Welcome, agent.")
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setError(error.message)
    } else {
      setUser(null)
      setMessage("You have been safely extracted from the system.")
    }
  }

  if (user) {
    return (
      <div className={styles.cyberSecContainer}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qRhVobWjo6H1SFt0hA0T3EOPUOZBuL.png"
          alt="CyberSec Logo"
          width={150}
          height={150}
        />
        <div className={styles.welcomeMessage}>Welcome, Agent {user.user_metadata.username || user.email}</div>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Terminate Session
        </button>
      </div>
    )
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

