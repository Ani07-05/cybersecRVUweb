"use client"

import { Flag, Trophy, Clock, Users, Star, ChevronRight } from 'lucide-react'
import styles from './ctfs.module.css'

export default function CTFsPage() {
  const challenges = [
    {
      title: "Web Exploitation",
      difficulty: "Medium",
      points: 500,
      solves: 23,
      timeLimit: "2 hours",
      category: "web"
    },
    {
      title: "Binary Analysis",
      difficulty: "Hard",
      points: 1000,
      solves: 12,
      timeLimit: "3 hours",
      category: "binary"
    },
    {
      title: "Cryptography",
      difficulty: "Easy",
      points: 250,
      solves: 45,
      timeLimit: "1 hour",
      category: "crypto"
    }
  ]

  return (
    <div className={styles.ctfsPage}>
      <header className={styles.header}>
        <h1>CTF Challenges</h1>
        <p>Test your skills with our cybersecurity challenges</p>
      </header>

      <div className={styles.challengesGrid}>
        {challenges.map((challenge, index) => (
          <div key={index} className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <Flag className={styles.categoryIcon} />
              <span className={`${styles.difficulty} ${styles[challenge.difficulty.toLowerCase()]}`}>
                {challenge.difficulty}
              </span>
            </div>
            <h2>{challenge.title}</h2>
            <div className={styles.challengeStats}>
              <div className={styles.stat}>
                <Trophy size={16} />
                <span>{challenge.points} pts</span>
              </div>
              <div className={styles.stat}>
                <Users size={16} />
                <span>{challenge.solves} solves</span>
              </div>
              <div className={styles.stat}>
                <Clock size={16} />
                <span>{challenge.timeLimit}</span>
              </div>
            </div>
            <button className={styles.startButton}>
              Start Challenge <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
