"use client"

import { useEffect, useState } from "react"
import CyberScene from "../components/CyberScene"
import WelcomeMessage from "../components/WelcomeMessage"
import StartButton from "../components/StartButton"
import CyberSecAuth from "../components/CyberSecAuth"
import { createClient } from "@supabase/supabase-js"
import styles from "./page.module.css"

// Create the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    console.log("Home component mounted")
    
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }, [])

  const handleJourneyComplete = () => {
    console.log("Journey complete called")
    setAnimationComplete(true)
    setTimeout(() => setShowAuth(true), 1000)
  }

  const handleStartJourney = () => {
    console.log("Start journey clicked")
    setJourneyStarted(true)
  }

  return (
    <main className={styles.main}>
      <CyberScene 
        journeyStarted={journeyStarted} 
        onJourneyComplete={handleJourneyComplete} 
      />
      
      {!journeyStarted && (
        <StartButton onClick={handleStartJourney} />
      )}
      
      {showAuth && <CyberSecAuth supabase={supabase} />}
    </main>
  )
}