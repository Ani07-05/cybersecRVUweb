"use client"

import { Users, Star, Award, User } from "lucide-react"
import Image from "next/image"

export default function MembersPage() {
  const leadership = [
    {
      name: "Anirudh",
      position: "President",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Leading the CyberSec RVU club with a passion for ethical hacking and network security.",
    },
    {
      name: "Arnav Jain",
      position: "Vice President",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Specializes in cryptography and secure coding practices. Coordinates club activities and mentorship programs.",
    },
  ]

  const coreMembers = [
    {
      name: "Harnith",
      specialization: "Web Security",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Vikas",
      specialization: "Network Security",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Shushruth",
      specialization: "Cryptography",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Adith Pani",
      specialization: "Malware Analysis",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Meghmavani",
      specialization: "Digital Forensics",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Ananya N Shetty",
      specialization: "OSINT",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Freya D Raja",
      specialization: "Reverse Engineering",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Satyam Goyal",
      specialization: "Cloud Security",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="members-page">
      <div className="page-header">
        <h1 className="page-title">Our Team</h1>
        <p className="page-description">
          Meet the dedicated team behind CyberSec RVU. Our leadership and core members work together to create a vibrant
          cybersecurity community.
        </p>
        <div className="member-stats">
          <div className="member-stat-card">
            <Users className="member-stat-icon" />
            <div className="member-stat-info">
              <h3 className="member-stat-value">350+</h3>
              <p className="member-stat-label">Total Members</p>
            </div>
          </div>
        </div>
      </div>

      <section className="leadership-section">
        <h2 className="section-title">Leadership</h2>
        <div className="leadership-grid">
          {leadership.map((leader, index) => (
            <div key={index} className="leadership-card">
              <div className="leadership-image-container">
                <Image
                  src={leader.image || "/placeholder.svg"}
                  alt={leader.name}
                  width={150}
                  height={150}
                  className="leadership-image"
                />
                <div className="leadership-badge">
                  {leader.position === "President" ? (
                    <Star className="leadership-badge-icon" />
                  ) : (
                    <Award className="leadership-badge-icon" />
                  )}
                </div>
              </div>
              <div className="leadership-info">
                <h3 className="leadership-name">{leader.name}</h3>
                <p className="leadership-position">{leader.position}</p>
                <p className="leadership-bio">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="core-members-section">
        <h2 className="section-title">Core Members</h2>
        <div className="core-members-grid">
          {coreMembers.map((member, index) => (
            <div key={index} className="core-member-card">
              <div className="core-member-image-container">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="core-member-image"
                />
              </div>
              <div className="core-member-info">
                <h3 className="core-member-name">{member.name}</h3>
                <p className="core-member-specialization">{member.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="join-team-section">
        <div className="join-team-content">
          <h2 className="join-team-title">Join Our Team</h2>
          <p className="join-team-description">
            Interested in becoming a part of CyberSec RVU? We're always looking for passionate individuals to join our
            community.
          </p>
          <a href="/dashboard/join" className="join-team-button">
            <User className="join-team-icon" />
            Apply Now
          </a>
        </div>
      </section>
    </div>
  )
}

