"use client"

import { useState, useEffect, useRef } from "react"
import { Shield, Users, Calendar, Flag, Terminal, AlertTriangle, Activity, Lock, Server, Cpu, Zap, ChevronRight } from 'lucide-react'
import Link from "next/link"
import { FileText } from 'lucide-react'

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [typedText, setTypedText] = useState("")
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "CyberSec Terminal v1.0.0",
    "Type \"help\" for available commands",
    "> ",
  ])
  const [gameLevel, setGameLevel] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [activeSection, setActiveSection] = useState("stats")

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fullText =
    "Your gateway to cybersecurity excellence. Explore our resources, participate in CTFs, and join our thriving community of security enthusiasts."

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Typewriter effect
    let i = 0
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, 50)

    return () => {
      clearInterval(timer)
      clearInterval(typeTimer)
    }
  }, [])

  useEffect(() => {
    // Scroll terminal to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  // Mock data for dashboard
  const stats = [
    { icon: Users, title: "Active Members", value: "350+", color: "#ffd700" },
    { icon: Calendar, title: "Upcoming Events", value: "2", color: "#ffd700" },
    { icon: Flag, title: "CTF Challenges", value: "42", color: "#ffd700" },
    { icon: Shield, title: "Security Score", value: "92%", color: "#ffd700" },
  ]

  const recentActivities = [
    { title: "Inter College CTF", date: "Coming Soon", type: "event" },
    { title: "KLinux Workshop", date: "Next Week", type: "event" },
    { title: "Tarang CTF", date: "2 weeks ago", type: "ctf" },
    { title: "Santhe CTF", date: "1 month ago", type: "ctf" },
  ]

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const input = terminalInput.trim().toLowerCase()
    let response: string[] = []

    // Game logic
    if (gameLevel > 0) {
      switch (gameLevel) {
        case 1:
          if (input === "ls" || input === "dir") {
            response = ["system_files  secret.txt  backdoor.exe  readme.md"]
            setGameLevel(2)
          } else {
            response = ["Try using \"ls\" to list files in the directory"]
          }
          break
        case 2:
          if (input === "cat secret.txt" || input === "type secret.txt") {
            response = [
              "The file is encrypted!",
              "You need to find the decryption key.",
              "Hint: Check the readme.md file",
            ]
            setGameLevel(3)
          } else {
            response = ["Try using \"cat secret.txt\" to view the file contents"]
          }
          break
        case 3:
          if (input === "cat readme.md" || input === "type readme.md") {
            response = [
              "# System Access",
              "The decryption key is hidden in the system files.",
              "Use \"find\" command to locate it.",
            ]
            setGameLevel(4)
          } else {
            response = ["Try checking the readme.md file for hints"]
          }
          break
        case 4:
          if (input === "find system_files -name \"key\"" || input === "find key") {
            response = [
              "Found: system_files/hidden/.key",
              "Use \"cat\" command to view it",
            ]
            setGameLevel(5)
          } else {
            response = ["Try using \"find\" to locate the key file"]
          }
          break
        case 5:
          if (input === "cat system_files/hidden/.key" || input === "cat .key") {
            response = [
              "Decryption key: CyB3rS3c_RVU_2023",
              "Use this key to decrypt the secret.txt file",
              "Command: decrypt secret.txt -k [key]",
            ]
            setGameLevel(6)
          } else {
            response = ["Try viewing the content of the key file"]
          }
          break
        case 6:
          if (input.includes("decrypt secret.txt") && input.includes("cyb3rs3c_rvu_2023")) {
            response = [
              "Decrypting secret.txt...",
              "...",
              "Decryption successful!",
              "",
              "=== CONFIDENTIAL ===",
              "Congratulations! You've completed the basic security challenge.",
              "You've demonstrated fundamental skills in:",
              "- File system navigation",
              "- File content inspection",
              "- Finding hidden files",
              "- Using decryption tools",
              "",
              "Your security clearance has been upgraded.",
              "=== ACCESS GRANTED ===",
              "",
              "Challenge completed! Type \"exit\" to return to the dashboard.",
            ]
            setGameCompleted(true)
            setGameLevel(7)
          } else {
            response = ["Try using the decrypt command with the correct key"]
          }
          break
        case 7:
          if (input === "exit") {
            setShowTerminal(false)
            setGameLevel(0)
          } else {
            response = ["Type \"exit\" to return to the dashboard"]
          }
          break
      }
    } else {
      // Regular terminal commands
      switch (input) {
        case "help":
          response = [
            "Available commands:",
            "  help - Show this help message",
            "  clear - Clear the terminal",
            "  game - Start the security challenge game",
            "  about - About CyberSec RVU",
            "  events - List upcoming events",
            "  resources - Show learning resources",
            "  exit - Close the terminal",
          ]
          break
        case "clear":
          setTerminalHistory([
            "CyberSec Terminal v1.0.0",
            "Type \"help\" for available commands",
            "> ",
          ])
          setTerminalInput("")
          return
        case "game":
          response = [
            "=== SECURITY CHALLENGE ===",
            "Welcome to the CyberSec RVU Security Challenge!",
            "You've gained access to a remote system and need to find a secret file.",
            "",
            "Objective: Find and decrypt the secret file.",
            "Start by exploring the file system.",
            "",
            "Type Linux commands to navigate and interact with the system.",
            "First, try listing the files in the current directory.",
          ]
          setGameLevel(1)
          break
        case "about":
          response = [
            "CyberSec RVU is the premier cybersecurity club at RV University.",
            "We focus on building cybersecurity skills through hands-on learning,",
            "CTF competitions, workshops, and a supportive community.",
            "",
            "Our motto: ज्ञानेनैव (Through Knowledge Alone)",
          ]
          break
        case "events":
          response = [
            "Upcoming Events:",
            "- Inter College CTF - A competitive CTF event between colleges",
            "- KLinux Workshop - Linux fundamentals for security",
            "",
            "Past Events:",
            "- Tarang CTF - Advanced security challenges",
            "- Santhe CTF - Beginner-friendly CTF competition",
          ]
          break
        case "resources":
          response = [
            "Learning Resources:",
            "- TryHackMe - Interactive cybersecurity training",
            "- HackTheBox - Advanced penetration testing labs",
            "- PortSwigger Web Security Academy - Web security training",
            "- PicoCTF - Educational CTF for beginners",
            "",
            'Type "resources" in the main dashboard for more detailed links',
          ]
          break
        case "exit":
          setShowTerminal(false)
          break
        default:
          if (input) {
            response = [`Command not found: ${input}`, "Type \"help\" for available commands"]
          } else {
            response = [""]
          }
      }
    }

    // Update terminal history
    setTerminalHistory((prev) => [
      ...prev.slice(0, -1), // Remove the last prompt
      `> ${terminalInput}`,
      ...response,
      "> ", // Add new prompt
    ])

    setTerminalInput("")
  }

  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-section">
        <div className="time-display">
          <div className="date">{currentTime.toLocaleDateString()}</div>
          <div className="time">{currentTime.toLocaleTimeString()}</div>
        </div>
        <h1 className="dashboard-title">
          CyberSec RVU Portal
          <div className="title-underline"></div>
        </h1>
        <p className="dashboard-description terminal-text">
          {typedText}
          <span className="cursor">_</span>
        </p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`dashboard-tab ${activeSection === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveSection('stats')}
        >
          <Shield className="tab-icon" />
          <span>Statistics</span>
        </button>
        <button 
          className={`dashboard-tab ${activeSection === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveSection('activities')}
        >
          <Activity className="tab-icon" />
          <span>Activities</span>
        </button>
        <button 
          className={`dashboard-tab ${activeSection === 'terminal' ? 'active' : ''}`}
          onClick={() => setActiveSection('terminal')}
        >
          <Terminal className="tab-icon" />
          <span>Terminal</span>
        </button>
        <button 
          className={`dashboard-tab ${activeSection === 'links' ? 'active' : ''}`}
          onClick={() => setActiveSection('links')}
        >
          <FileText className="tab-icon" />
          <span>Quick Links</span>
        </button>
      </div>

      <div className="dashboard-sections">
        {/* Stats Section */}
        <section className={`dashboard-section ${activeSection === 'stats' ? 'active' : ''}`}>
          <h2 className="section-title">Club Statistics</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index} style={{"--delay": `${index * 0.1}s`} as React.CSSProperties}>
                <div
                  className="stat-icon-container"
                  style={{ backgroundColor: `${stat.color}20`, borderColor: stat.color }}
                >
                  <stat.icon className="stat-icon" style={{ color: stat.color }} />
                </div>
                <div className="stat-info">
                  <h3 className="stat-title">{stat.title}</h3>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="system-status">
            <h3 className="subsection-title">System Status</h3>
            <div className="status-grid">
              <div className="status-card">
                <Server className="status-icon" />
                <div className="status-bar-container">
                  <div className="status-bar" style={{ width: "87%" }}></div>
                </div>
                <div className="status-info">
                  <span className="status-label">Server Load</span>
                  <span className="status-value">87%</span>
                </div>
              </div>
              <div className="status-card">
                <Lock className="status-icon" />
                <div className="status-bar-container">
                  <div className="status-bar" style={{ width: "100%" }}></div>
                </div>
                <div className="status-info">
                  <span className="status-label">Security</span>
                  <span className="status-value">100%</span>
                </div>
              </div>
              <div className="status-card">
                <Cpu className="status-icon" />
                <div className="status-bar-container">
                  <div className="status-bar" style={{ width: "62%" }}></div>
                </div>
                <div className="status-info">
                  <span className="status-label">CPU Usage</span>
                  <span className="status-value">62%</span>
                </div>
              </div>
              <div className="status-card">
                <Activity className="status-icon" />
                <div className="status-bar-container">
                  <div className="status-bar" style={{ width: "45%" }}></div>
                </div>
                <div className="status-info">
                  <span className="status-label">Network</span>
                  <span className="status-value">45%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="security-alerts">
            <h3 className="subsection-title">Security Alerts</h3>
            <div className="alerts-container">
              <div className="alert-card">
                <AlertTriangle className="alert-icon" />
                <div className="alert-info">
                  <h3 className="alert-title">No Active Threats</h3>
                  <p className="alert-description">Your system is currently secure. No active threats detected.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className={`dashboard-section ${activeSection === 'activities' ? 'active' : ''}`}>
          <h2 className="section-title">Recent Activities</h2>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div 
                className="activity-item" 
                key={index}
                style={{"--delay": `${index * 0.1}s`} as React.CSSProperties}
              >
                <div
                  className="activity-icon-container"
                  style={{
                    backgroundColor:
                      activity.type === "event" ? "#ffd70020" : activity.type === "ctf" ? "#ffd70020" : "#ffd70020",
                    borderColor:
                      activity.type === "event" ? "#ffd700" : activity.type === "ctf" ? "#ffd700" : "#ffd700",
                  }}
                >
                  {activity.type === "event" && <Calendar className="activity-icon" style={{ color: "#ffd700" }} />}
                  {activity.type === "ctf" && <Flag className="activity-icon" style={{ color: "#ffd700" }} />}
                  {activity.type === "resource" && <Terminal className="activity-icon" style={{ color: "#ffd700" }} />}
                </div>
                <div className="activity-info">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-date">{activity.date}</p>
                </div>
                <ChevronRight className="activity-arrow" />
              </div>
            ))}
          </div>

          <div className="view-all-container">
            <Link href="/dashboard/events" className="view-all-link">
              View All Events
            </Link>
          </div>
        </section>

        {/* Terminal Section */}
        <section className={`dashboard-section ${activeSection === 'terminal' ? 'active' : ''}`}>
          <h2 className="section-title">Cyber Training Terminal</h2>
          <div className="terminal-game-container">
            <div className="terminal-intro">
              <h3 className="terminal-title">Interactive Terminal Challenge</h3>
              <p className="terminal-description">
                Test your cybersecurity skills with our interactive terminal challenge. Navigate through a simulated system, find hidden files, and decrypt secret messages.
              </p>
              <button className="terminal-launch-btn" onClick={() => setShowTerminal(true)}>
                <Terminal className="terminal-btn-icon" />
                Launch Terminal
              </button>
              {gameCompleted && (
                <div className="game-completed-badge">
                  <Zap className="badge-icon" />
                  Challenge Completed!
                </div>
              )}
            </div>

            {showTerminal && (
              <div className="terminal-overlay" onClick={focusTerminal}>
                <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
                  <div className="terminal-header">
                    <div className="terminal-title">CyberSec Terminal</div>
                    <button className="terminal-close-btn" onClick={() => setShowTerminal(false)}>
                      ×
                    </button>
                  </div>
                  <div className="terminal-body" ref={terminalRef}>
                    {terminalHistory.map((line, index) => (
                      <div key={index} className="terminal-line">
                        {line}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleTerminalSubmit} className="terminal-input-form">
                    <input
                      ref={inputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="terminal-input"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className={`dashboard-section ${activeSection === 'links' ? 'active' : ''}`}>
          <h2 className="section-title">Quick Links</h2>
          <div className="quick-links-grid">
            <Link 
              href="/events" 
              className="quick-link-card"
              style={{"--delay": "0.1s"} as React.CSSProperties}
            >
              <Calendar className="quick-link-icon" />
              <span className="quick-link-text">Events</span>
            </Link>
            <Link 
              href="/resources" 
              className="quick-link-card"
              style={{"--delay": "0.2s"} as React.CSSProperties}
            >
              <FileText className="quick-link-icon" />
              <span className="quick-link-text">Resources</span>
            </Link>
            <Link 
              href="/ctfs" 
              className="quick-link-card"
              style={{"--delay": "0.3s"} as React.CSSProperties}
            >
              <Flag className="quick-link-icon" />
              <span className="quick-link-text">CTFs</span>
            </Link>
            <Link 
              href="/join" 
              className="quick-link-card"
              style={{"--delay": "0.4s"} as React.CSSProperties}
            >
              <Users className="quick-link-icon" />
              <span className="quick-link-text">Join Us</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
