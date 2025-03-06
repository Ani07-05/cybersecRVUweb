"use client"

import { useState, useEffect, useRef } from "react"
import { Flag, Lock, Unlock, Award, CheckCircle, XCircle, Clock, Terminal, Shield, Database, Code, Globe, Info } from 'lucide-react'

export default function CTFsPage() {
  const [animateIn, setAnimateIn] = useState(false)
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null)
  const [flagInput, setFlagInput] = useState("")
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null)
  const [solvedChallenges, setSolvedChallenges] = useState<number[]>([])
  const [userPoints, setUserPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true)
    
    // Load solved challenges from localStorage
    const savedSolved = localStorage.getItem('solvedChallenges')
    if (savedSolved) {
      setSolvedChallenges(JSON.parse(savedSolved))
    }
    
    // Load user points from localStorage
    const savedPoints = localStorage.getItem('userPoints')
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints, 10))
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const challenges = [
    {
      id: 1,
      title: "Web Exploitation: Cookie Monster",
      category: "web",
      difficulty: "Easy",
      points: 100,
      description: "There's a secret flag hidden in the cookies of this website. Can you find it?",
      hint: "Check the browser's developer tools to inspect cookies.",
      flag: "flag{c00k13s_4r3_d3l1c10us}",
      icon: Globe
    },
    {
      id: 2,
      title: "Cryptography: Caesar's Secret",
      category: "crypto",
      difficulty: "Easy",
      points: 150,
      description: "Julius Caesar used a simple shift cipher to protect his messages. Can you decrypt this message?\n\nPzou{jhlzhy_jpwoly_pz_avv_lhzf}",
      hint: "Try different shift values. The flag format is flag{...}",
      flag: "flag{caesar_cipher_is_too_easy}",
      icon: Lock
    },
    {
      id: 3,
      title: "Reverse Engineering: Binary Puzzle",
      category: "reverse",
      difficulty: "Medium",
      points: 250,
      description: "Analyze this binary code and find the hidden flag:\n\n01100110 01101100 01100001 01100111 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01011111 01101001 01110011 01011111 01100110 01110101 01101110 01111101",
      hint: "Convert binary to ASCII characters.",
      flag: "flag{binary_is_fun}",
      icon: Code
    },
    {
      id: 4,
      title: "Forensics: Hidden Metadata",
      category: "forensics",
      difficulty: "Medium",
      points: 200,
      description: "There's a flag hidden in the metadata of an image. Examine the properties carefully.",
      hint: "Look for EXIF data in the image file.",
      flag: "flag{m3t4d4t4_n3v3r_l13s}",
      icon: Database
    },
    {
      id: 5,
      title: "Network Security: Packet Analysis",
      category: "network",
      difficulty: "Hard",
      points: 300,
      description: "Analyze the network traffic to find the hidden flag being transmitted.",
      hint: "Look for unusual HTTP requests in the packet capture.",
      flag: "flag{p4ck3t_sn1ff1ng_ftw}",
      icon: Shield
    },
    {
      id: 6,
      title: "Steganography: Hidden in Plain Sight",
      category: "stego",
      difficulty: "Hard",
      points: 350,
      description: "There's a message hidden in this image. Can you extract it?",
      hint: "Try using steganography tools to reveal hidden data in the image.",
      flag: "flag{h1dd3n_1n_pl41n_s1ght}",
      icon: Terminal
    }
  ]

  const startChallenge = (id: number) => {
    if (solvedChallenges.includes(id)) {
      setMessage({
        text: "You've already solved this challenge!",
        type: 'info'
      })
      setActiveChallenge(id)
      return
    }
    
    setActiveChallenge(id)
    setFlagInput("")
    setMessage(null)
    
    // Set a 30-minute timer for the challenge
    setTimeLeft(30 * 60) // 30 minutes in seconds
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const submitFlag = (id: number) => {
    const challenge = challenges.find(c => c.id === id)
    if (!challenge) return
    
    if (flagInput.trim().toLowerCase() === challenge.flag.toLowerCase()) {
      // Correct flag
      if (!solvedChallenges.includes(id)) {
        const newSolved = [...solvedChallenges, id]
        setSolvedChallenges(newSolved)
        localStorage.setItem('solvedChallenges', JSON.stringify(newSolved))
        
        const newPoints = userPoints + challenge.points
        setUserPoints(newPoints)
        localStorage.setItem('userPoints', newPoints.toString())
      }
      
      setMessage({
        text: "Correct flag! Great job!",
        type: 'success'
      })
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        setTimeLeft(null)
      }
    } else {
      // Incorrect flag
      setMessage({
        text: "Incorrect flag. Try again!",
        type: 'error'
      })
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`ctfs-page ${animateIn ? 'animate-in' : ''}`}>
      <div className="page-header">
        <h1 className="page-title">Mock CTF Challenges</h1>
        <p className="page-description">
          Test your cybersecurity skills with these Capture The Flag challenges. Solve puzzles, find vulnerabilities, and submit flags to earn points.
        </p>
        
        <div className="user-score">
          <Award className="score-icon" />
          <div className="score-info">
            <span className="score-label">Your Score</span>
            <span className="score-value">{userPoints} points</span>
          </div>
          <div className="solved-info">
            <span className="solved-count">{solvedChallenges.length}/{challenges.length}</span>
            <span className="solved-label">Challenges Solved</span>
          </div>
        </div>
      </div>

      <div className="ctf-container">
        <div className="challenges-list">
          <h2 className="section-title">Available Challenges</h2>
          {challenges.map((challenge, index) => (
            <div 
              key={challenge.id} 
              className={`challenge-card ${activeChallenge === challenge.id ? 'active' : ''} ${solvedChallenges.includes(challenge.id) ? 'solved' : ''}`}
              onClick={() => startChallenge(challenge.id)}
              style={{"--delay": `${index * 0.1}s`} as React.CSSProperties}
            >
              <div className="challenge-header">
                <div className={`challenge-category ${challenge.category}`}>
                  <challenge.icon className="category-icon" />
                  <span>{challenge.category}</span>
                </div>
                <div className="challenge-points">{challenge.points} pts</div>
              </div>
              <h3 className="challenge-title">{challenge.title}</h3>
              <div className="challenge-difficulty">
                <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>
                  {challenge.difficulty}
                </span>
              </div>
              {solvedChallenges.includes(challenge.id) && (
                <div className="solved-badge">
                  <CheckCircle className="solved-icon" />
                  <span>Solved</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="challenge-details">
          {activeChallenge ? (
            <>
              {challenges.filter(c => c.id === activeChallenge).map(challenge => (
                <div key={challenge.id} className="active-challenge">
                  <div className="challenge-detail-header">
                    <h2>{challenge.title}</h2>
                    <div className="challenge-meta">
                      <div className={`challenge-category ${challenge.category}`}>
                        <challenge.icon className="category-icon" />
                        <span>{challenge.category}</span>
                      </div>
                      <div className="challenge-points">{challenge.points} points</div>
                      <div className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>
                        {challenge.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  {timeLeft !== null && !solvedChallenges.includes(challenge.id) && (
                    <div className="challenge-timer">
                      <Clock className="timer-icon" />
                      <span className="timer-text">Time remaining: {formatTime(timeLeft)}</span>
                    </div>
                  )}
                  
                  <div className="challenge-description">
                    <p>{challenge.description}</p>
                  </div>
                  
                  <div className="challenge-hint">
                    <details>
                      <summary>Need a hint?</summary>
                      <p>{challenge.hint}</p>
                    </details>
                  </div>
                  
                  {!solvedChallenges.includes(challenge.id) ? (
                    <div className="flag-submission">
                      <label htmlFor="flag-input">Submit Flag:</label>
                      <div className="flag-input-container">
                        <input
                          id="flag-input"
                          type="text"
                          value={flagInput}
                          onChange={(e) => setFlagInput(e.target.value)}
                          placeholder="Enter flag (e.g., flag{...})"
                          className="flag-input"
                        />
                        <button 
                          className="submit-flag-btn"
                          onClick={() => submitFlag(challenge.id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="challenge-completed">
                      <CheckCircle className="completed-icon" />
                      <h3>Challenge Completed!</h3>
                      <p>You've successfully solved this challenge.</p>
                    </div>
                  )}
                  
                  {message && (
                    <div className={`message ${message.type}`}>
                      {message.type === 'success' && <CheckCircle className="message-icon" />}
                      {message.type === 'error' && <XCircle className="message-icon" />}
                      {message.type === 'info' && <Info className="message-icon" />}
                      <p>{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="no-challenge-selected">
              <Flag className="select-icon" />
              <h2>Select a Challenge</h2>
              <p>Choose a challenge from the list to get started. Solve puzzles, find vulnerabilities, and submit flags to earn points.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
