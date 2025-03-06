"use client"

import type React from "react"
import styles from "./join.module.css"

import { useState } from "react"
import { Users, MessageSquare, Instagram, Linkedin, Globe, Send, Flag, Terminal } from "lucide-react"

//usinh join.module.css as stylesheet

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    interest: "",
    experience: "",
    message: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setFormSubmitted(true)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      year: "",
      interest: "",
      experience: "",
      message: "",
    })

    // Reset submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  const socialLinks = [
    {
      name: "WhatsApp Group",
      icon: MessageSquare,
      url: "https://chat.whatsapp.com/L9fkgEKsQd1IR0PjV5Xbvd",
      color: "#25D366",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/cybersec_rvu",
      color: "#E1306C",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/cybersec-rvu",
      color: "#0077B5",
    },
    {
      name: "Discord",
      icon: Globe,
      url: "https://discord.gg/UBykWwXsZP",
      color: "#7289DA",
    },
  ]

  return (
    <div className="join-page">
      <div className="page-header">
        <h1 className="page-title">Join CyberSec RVU</h1>
        <p className="page-description">
          Become part of our cybersecurity community and enhance your skills through hands-on learning, competitions,
          and networking.
        </p>
        <div className="motto">
          ज्ञानेनैव <span className="motto-translation">(Through Knowledge Alone)</span>
        </div>
      </div>

      <div className="join-content">
        <section className="join-form-section">
          <h2 className="section-title">Membership Application</h2>
          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Year of Study</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="interest">Primary Interest</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Interest</option>
                  <option value="web">Web Security</option>
                  <option value="network">Network Security</option>
                  <option value="crypto">Cryptography</option>
                  <option value="forensics">Digital Forensics</option>
                  <option value="reverse">Reverse Engineering</option>
                  <option value="general">General Cybersecurity</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience Level</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Experience</option>
                <option value="beginner">Beginner (No prior experience)</option>
                <option value="intermediate">Intermediate (Some knowledge)</option>
                <option value="advanced">Advanced (Practical experience)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Why do you want to join?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us why you're interested in joining CyberSec RVU"
                rows={4}
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              <Send className="submit-icon" />
              Submit Application
            </button>

            {formSubmitted && (
              <div className="form-success-message">
                Your application has been submitted successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </section>

        <section className="social-links-section">
          <h2 className="section-title">Connect With Us</h2>
          <p className="social-description">
            Join our online communities to stay updated with the latest events, resources, and discussions.
          </p>

          <div className="social-links-grid">
            {socialLinks.map((link, index) => (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-card"
                key={index}
                style={{ "--card-color": link.color } as React.CSSProperties}
              >
                <link.icon className="social-icon" />
                <span className="social-name">{link.name}</span>
                <span className="join-now">Join Now</span>
              </a>
            ))}
          </div>

          <div className="member-benefits">
            <h3 className="benefits-title">Member Benefits</h3>
            <ul className="benefits-list">
              <li className="benefit-item">
                <div className="benefit-icon-container">
                  <Users className="benefit-icon" />
                </div>
                <div className="benefit-content">
                  <h4 className="benefit-title">Community</h4>
                  <p className="benefit-description">Connect with like-minded cybersecurity enthusiasts</p>
                </div>
              </li>
              <li className="benefit-item">
                <div className="benefit-icon-container">
                  <Flag className="benefit-icon" />
                </div>
                <div className="benefit-content">
                  <h4 className="benefit-title">CTF Competitions</h4>
                  <p className="benefit-description">Participate in team-based cybersecurity competitions</p>
                </div>
              </li>
              <li className="benefit-item">
                <div className="benefit-icon-container">
                  <Terminal className="benefit-icon" />
                </div>
                <div className="benefit-content">
                  <h4 className="benefit-title">Workshops</h4>
                  <p className="benefit-description">Attend hands-on technical workshops and training sessions</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

