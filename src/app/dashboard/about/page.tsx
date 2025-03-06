"use client"

import { useState, useEffect } from "react"
import { Shield, Users, Calendar, Flag, Terminal, Book, Award, Target, Zap, Code } from 'lucide-react'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("mission")
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true)
  }, [])

  const missionContent = (
    <div className="about-content mission-content">
      <div className="mission-header">
        <Shield className="mission-icon" />
        <h2>Our Mission</h2>
      </div>
      <p className="mission-text">
        At CyberSec RVU, our mission is to cultivate a community of cybersecurity enthusiasts dedicated to learning, sharing, and advancing security knowledge. We believe in empowering students with practical skills through hands-on experiences, collaborative learning, and real-world challenges.
      </p>
      <div className="mission-quote">
        <blockquote>
          "ज्ञानेनैव" - Through Knowledge Alone
        </blockquote>
        <p className="quote-explanation">
          Our Sanskrit motto embodies our belief that knowledge is the foundation of all security. By understanding systems, vulnerabilities, and threats, we can better protect our digital world.
        </p>
      </div>
    </div>
  )

  const visionContent = (
    <div className="about-content vision-content">
      <div className="vision-pillars">
        <div className="vision-pillar">
          <Target className="pillar-icon" />
          <h3>Excellence</h3>
          <p>Striving for the highest standards in cybersecurity education and practice</p>
        </div>
        <div className="vision-pillar">
          <Users className="pillar-icon" />
          <h3>Community</h3>
          <p>Building a supportive network of security professionals and enthusiasts</p>
        </div>
        <div className="vision-pillar">
          <Zap className="pillar-icon" />
          <h3>Innovation</h3>
          <p>Exploring cutting-edge security techniques and technologies</p>
        </div>
        <div className="vision-pillar">
          <Code className="pillar-icon" />
          <h3>Practical Skills</h3>
          <p>Focusing on applicable, hands-on security knowledge</p>
        </div>
      </div>
    </div>
  )

  const activitiesContent = (
    <div className="about-content activities-content">
      <div className="activities-grid">
        <div className="activity-card">
          <Flag className="activity-icon" />
          <h3>CTF Competitions</h3>
          <p>Regular capture-the-flag events that challenge members to solve security puzzles across various domains</p>
        </div>
        <div className="activity-card">
          <Terminal className="activity-icon" />
          <h3>Workshops</h3>
          <p>Hands-on technical sessions covering essential cybersecurity tools and techniques</p>
        </div>
        <div className="activity-card">
          <Book className="activity-icon" />
          <h3>Study Groups</h3>
          <p>Collaborative learning environments for certifications and specialized security topics</p>
        </div>
        <div className="activity-card">
          <Award className="activity-icon" />
          <h3>Industry Connections</h3>
          <p>Networking events and guest lectures from cybersecurity professionals</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`about-page ${animateIn ? 'animate-in' : ''}`}>
      <div className="page-header">
        <h1 className="page-title">About CyberSec RVU</h1>
        <p className="page-description">
          Learn about our mission, vision, and the activities that make CyberSec RVU the premier cybersecurity club at RV University.
        </p>
      </div>

      <div className="about-tabs">
        <button 
          className={`about-tab ${activeSection === 'mission' ? 'active' : ''}`}
          onClick={() => setActiveSection('mission')}
        >
          <Shield className="tab-icon" />
          <span>Our Mission</span>
        </button>
        <button 
          className={`about-tab ${activeSection === 'vision' ? 'active' : ''}`}
          onClick={() => setActiveSection('vision')}
        >
          <Target className="tab-icon" />
          <span>Our Vision</span>
        </button>
        <button 
          className={`about-tab ${activeSection === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveSection('activities')}
        >
          <Calendar className="tab-icon" />
          <span>Our Activities</span>
        </button>
      </div>

      <div className="about-section-container">
        {activeSection === 'mission' && missionContent}
        {activeSection === 'vision' && visionContent}
        {activeSection === 'activities' && activitiesContent}
      </div>

      <div className="about-footer">
        <div className="about-stats">
          <div className="about-stat">
            <h3>Founded</h3>
            <p>2021</p>
          </div>
          <div className="about-stat">
            <h3>Members</h3>
            <p>350+</p>
          </div>
          <div className="about-stat">
            <h3>Events</h3>
            <p>25+</p>
          </div>
          <div className="about-stat">
            <h3>CTFs</h3>
            <p>12+</p>
          </div>
        </div>
      </div>
    </div>
  )
}
