"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Shield, Users, Calendar, FileText, Flag, BookOpen, MessageSquare, Info, LogOut, ChevronRight, Activity, Terminal, Lock, AlertTriangle, Menu } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [activeLink, setActiveLink] = useState("/dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check for username after component mounts
    const storedUsername = window.sessionStorage.getItem("username")
    if (!storedUsername) {
      router.push("/")
    } else {
      setUsername(storedUsername)
    }

    // Set active link based on current path
    setActiveLink(window.location.pathname)

    // Add circuit board background effect
    const circuitBoard = document.createElement("div")
    circuitBoard.className = "circuit-board"
    document.body.appendChild(circuitBoard)

    // Add glitch effect to body
    document.body.classList.add("glitch-bg")

    return () => {
      document.body.removeChild(circuitBoard)
      document.body.classList.remove("glitch-bg")
    }
  }, [router])

  const handleLogout = () => {
    window.sessionStorage.removeItem("username")
    router.push("/")
  }

  if (!username) return null

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu className="mobile-menu-icon" />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qRhVobWjo6H1SFt0hA0T3EOPUOZBuL.png"
              alt="CyberSec Logo"
              width={collapsed ? 40 : 60}
              height={collapsed ? 40 : 60}
              className="logo"
            />
            {!collapsed && <h2 className="logo-text">CyberSec RVU</h2>}
          </div>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <div className="nav-section">
              <h3 className={`section-title ${collapsed ? "hidden" : ""}`}>Main</h3>
              <ul className="nav-list">
                <li className={activeLink === "/dashboard" ? "active" : ""}>
                  <Link href="/dashboard" className="nav-link" onClick={() => {
                    setActiveLink("/dashboard")
                    setMobileMenuOpen(false)
                  }}>
                    <Shield className="nav-icon" />
                    {!collapsed && <span>Dashboard</span>}
                  </Link>
                </li>
                <li className={activeLink === "/dashboard/about" ? "active" : ""}>
                  <Link href="/dashboard/about" className="nav-link" onClick={() => {
                    setActiveLink("/dashboard/about")
                    setMobileMenuOpen(false)
                  }}>
                    <Info className="nav-icon" />
                    {!collapsed && <span>About Us</span>}
                  </Link>
                </li>
                <li className={activeLink === "/dashboard/events" ? "active" : ""}>
                  <Link
                    href="/dashboard/events"
                    className="nav-link"
                    onClick={() => {
                      setActiveLink("/dashboard/events")
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Calendar className="nav-icon" />
                    {!collapsed && <span>Events</span>}
                  </Link>
                </li>
                <li className={activeLink === "/dashboard/members" ? "active" : ""}>
                  <Link
                    href="/dashboard/members"
                    className="nav-link"
                    onClick={() => {
                      setActiveLink("/dashboard/members")
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Users className="nav-icon" />
                    {!collapsed && <span>Members</span>}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h3 className={`section-title ${collapsed ? "hidden" : ""}`}>Resources</h3>
              <ul className="nav-list">
                <li className={activeLink === "/dashboard/resources" ? "active" : ""}>
                  <Link
                    href="/dashboard/resources"
                    className="nav-link"
                    onClick={() => {
                      setActiveLink("/dashboard/resources")
                      setMobileMenuOpen(false)
                    }}
                  >
                    <FileText className="nav-icon" />
                    {!collapsed && <span>Resources</span>}
                  </Link>
                </li>
                <li className={activeLink === "/dashboard/ctfs" ? "active" : ""}>
                  <Link href="/dashboard/ctfs" className="nav-link" onClick={() => {
                    setActiveLink("/dashboard/ctfs")
                    setMobileMenuOpen(false)
                  }}>
                    <Flag className="nav-icon" />
                    {!collapsed && <span>Mock CTFs</span>}
                  </Link>
                </li>
                <li className={activeLink === "/dashboard/sessions" ? "active" : ""}>
                  <Link
                    href="/dashboard/sessions"
                    className="nav-link"
                    onClick={() => {
                      setActiveLink("/dashboard/sessions")
                      setMobileMenuOpen(false)
                    }}
                  >
                    <BookOpen className="nav-icon" />
                    {!collapsed && <span>Sessions</span>}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h3 className={`section-title ${collapsed ? "hidden" : ""}`}>Community</h3>
              <ul className="nav-list">
                <li className={activeLink === "/dashboard/join" ? "active" : ""}>
                  <Link href="/dashboard/join" className="nav-link" onClick={() => {
                    setActiveLink("/dashboard/join")
                    setMobileMenuOpen(false)
                  }}>
                    <Activity className="nav-icon" />
                    {!collapsed && <span>Join Us</span>}
                  </Link>
                </li>
                <li className={activeLink === "/dashboard/feedback" ? "active" : ""}>
                  <Link
                    href="/dashboard/feedback"
                    className="nav-link"
                    onClick={() => {
                      setActiveLink("/dashboard/feedback")
                      setMobileMenuOpen(false)
                    }}
                  >
                    <MessageSquare className="nav-icon" />
                    {!collapsed && <span>Feedback</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <LogOut className="nav-icon" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="user-welcome">
              <Terminal className="terminal-icon" />
              <span className="welcome-text">
                Welcome, <span className="username">{username}</span>
              </span>
            </div>
            <div className="header-actions">
              <div className="security-status">
                <Lock className="status-icon secure" />
                <span className="status-text">Secure Connection</span>
              </div>
              <div className="alert-indicator">
                <AlertTriangle className="alert-icon" />
                <span className="alert-count">0</span>
              </div>
            </div>
          </div>
        </header>
        <div className="content-wrapper">{children}</div>
      </main>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  )
}
