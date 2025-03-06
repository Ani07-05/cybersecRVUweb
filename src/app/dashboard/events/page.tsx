"use client"

import { Calendar, Clock, MapPin, Users, Flag, Terminal, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true)
  }, [])

  const upcomingEvents = [
    {
      id: 1,
      title: 'Inter College CTF',
      date: 'November 20, 2023',
      time: '9:00 AM - 5:00 PM',
      location: 'RV University Campus',
      description: 'A competitive Capture The Flag event between colleges across the region. Teams will compete to solve challenging cybersecurity puzzles and demonstrate their skills in various security domains including web exploitation, cryptography, reverse engineering, and more.',
      image: '/placeholder.svg?height=200&width=400',
      type: 'ctf',
      registrationOpen: true
    },
    {
      id: 2,
      title: 'KLinux Workshop',
      date: 'October 28, 2023',
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Lab 3, RV University',
      description: 'A hands-on workshop covering Linux fundamentals for cybersecurity. Learn essential command-line tools, system administration basics, and security configurations that form the foundation of cybersecurity operations. This workshop is perfect for beginners looking to build their Linux skills.',
      image: '/placeholder.svg?height=200&width=400',
      type: 'workshop',
      registrationOpen: true
    }
  ]

  const pastEvents = [
    {
      id: 3,
      title: 'Tarang CTF',
      date: 'September 15, 2023',
      time: '9:00 AM - 6:00 PM',
      location: 'Online (Discord)',
      description: 'An advanced CTF competition with challenging problems across multiple security domains. This event was designed for experienced participants looking to test their skills against complex security scenarios.',
      image: '/placeholder.svg?height=200&width=400',
      type: 'ctf'
    },
    {
      id: 4,
      title: 'Santhe CTF',
      date: 'August 10, 2023',
      time: '10:00 AM - 4:00 PM',
      location: 'RV University Campus',
      description: 'A beginner-friendly Capture The Flag competition designed to introduce students to cybersecurity challenges. Participants solved puzzles related to cryptography, web security, forensics, and more.',
      image: '/placeholder.svg?height=200&width=400',
      type: 'ctf'
    },
    {
      id: 5,
      title: 'Web Security Workshop',
      date: 'July 12, 2023',
      type: 'workshop'
    },
    {
      id: 6,
      title: 'Network Security Session',
      date: 'June 25, 2023',
      type: 'workshop'
    }
  ]

  const toggleEvent = (id: number) => {
    if (selectedEvent === id) {
      setSelectedEvent(null)
    } else {
      setSelectedEvent(id)
    }
  }

  return (
    <div className={`events-page ${animateIn ? 'animate-in' : ''}`}>
      <div className="page-header">
        <h1 className="page-title">Events</h1>
        <p className="page-description">
          Join our upcoming cybersecurity events, workshops, and competitions to enhance your skills and connect with the community.
        </p>
      </div>

      <section className="upcoming-events-section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`event-card ${selectedEvent === event.id ? 'expanded' : ''}`}
              style={{"--delay": `${index * 0.1}s`} as React.CSSProperties}
            >
              <div className="event-card-header" onClick={() => toggleEvent(event.id)}>
                <div className={`event-type-badge ${event.type}`}>
                  {event.type === 'ctf' ? <Flag className="event-type-icon" /> : <Terminal className="event-type-icon" />}
                  {event.type === 'ctf' ? 'CTF Competition' : 'Workshop'}
                </div>
                <h3 className="event-title">{event.title}</h3>
                <button className="event-expand-btn">
                  {selectedEvent === event.id ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
              
              <div className="event-details">
                <div className="event-detail">
                  <Calendar className="event-detail-icon" />
                  <span>{event.date}</span>
                </div>
                <div className="event-detail">
                  <Clock className="event-detail-icon" />
                  <span>{event.time}</span>
                </div>
                <div className="event-detail">
                  <MapPin className="event-detail-icon" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              {selectedEvent === event.id && (
                <div className="event-expanded-content">
                  <p className="event-description">{event.description}</p>
                  <button className="event-register-btn">
                    {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="past-events-section">
        <h2 className="section-title">Past Events</h2>
        <div className="past-events-list">
          {pastEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`past-event-item ${selectedEvent === event.id ? 'expanded' : ''}`}
              style={{"--delay": `${index * 0.1}s`} as React.CSSProperties}
              onClick={() => toggleEvent(event.id)}
            >
              <div className={`past-event-type ${event.type}`}>
                {event.type === 'ctf' ? <Flag className="past-event-icon" /> : <Terminal className="past-event-icon" />}
              </div>
              <div className="past-event-info">
                <h3 className="past-event-title">{event.title}</h3>
                <p className="past-event-date">{event.date}</p>
              </div>
              {event.description && (
                <button className="event-expand-btn">
                  {selectedEvent === event.id ? <ChevronUp /> : <ChevronDown />}
                </button>
              )}
              
              {selectedEvent === event.id && event.description && (
                <div className="past-event-expanded">
                  <p className="past-event-description">{event.description}</p>
                  {event.time && event.location && (
                    <div className="past-event-details">
                      <div className="event-detail">
                        <Clock className="event-detail-icon" />
                        <span>{event.time}</span>
                      </div>
                      <div className="event-detail">
                        <MapPin className="event-detail-icon" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
