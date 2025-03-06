"use client"

import { ExternalLink, BookOpen, Flag, Terminal, Shield, Code, Database, Lock, Globe } from "lucide-react"
import { useState } from "react"

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Resources", icon: BookOpen },
    { id: "ctf", name: "CTF Resources", icon: Flag },
    { id: "ethical", name: "Ethical Hacking", icon: Terminal },
    { id: "web", name: "Web Security", icon: Globe },
    { id: "network", name: "Network Security", icon: Shield },
  ]

  const resources = [
    {
      title: "Getting Started with CTFs",
      description:
        "A comprehensive guide for beginners looking to start participating in Capture The Flag competitions.",
      link: "https://ctftime.org/ctf-wtf/",
      category: "ctf",
      icon: Flag,
    },
    {
      title: "TryHackMe: Complete Beginner Path",
      description: "Interactive cybersecurity training with guided learning paths for beginners.",
      link: "https://tryhackme.com/path/outline/beginner",
      category: "ethical",
      icon: Terminal,
    },
    {
      title: "PortSwigger Web Security Academy",
      description: "Free, online web security training with interactive labs and detailed learning materials.",
      link: "https://portswigger.net/web-security",
      category: "web",
      icon: Globe,
    },
    {
      title: "PicoCTF Learning Resources",
      description: "Educational resources and practice challenges for beginners in cybersecurity.",
      link: "https://picoctf.org/resources",
      category: "ctf",
      icon: Flag,
    },
    {
      title: "OWASP Top 10",
      description: "Learn about the most critical web application security risks according to OWASP.",
      link: "https://owasp.org/www-project-top-ten/",
      category: "web",
      icon: Shield,
    },
    {
      title: "Ethical Hacking: A Hands-On Introduction",
      description: "A beginner-friendly guide to ethical hacking methodologies and tools.",
      link: "https://www.hacksplaining.com/",
      category: "ethical",
      icon: Terminal,
    },
    {
      title: "CTF Field Guide",
      description: "A guide to the common challenge types and how to approach them in CTF competitions.",
      link: "https://trailofbits.github.io/ctf/",
      category: "ctf",
      icon: BookOpen,
    },
    {
      title: "HackTheBox Academy",
      description: "Structured cybersecurity training with hands-on exercises and real-world scenarios.",
      link: "https://academy.hackthebox.com/",
      category: "ethical",
      icon: Code,
    },
    {
      title: "Network Security Fundamentals",
      description: "Learn the basics of network security, protocols, and common vulnerabilities.",
      link: "https://www.cybrary.it/course/network-security-fundamentals/",
      category: "network",
      icon: Shield,
    },
    {
      title: "Cryptography for Beginners",
      description: "An introduction to cryptographic concepts, algorithms, and their applications in security.",
      link: "https://www.crypto101.io/",
      category: "ethical",
      icon: Lock,
    },
    {
      title: "SQL Injection Attacks Explained",
      description: "Understanding and preventing SQL injection vulnerabilities in web applications.",
      link: "https://www.w3schools.com/sql/sql_injection.asp",
      category: "web",
      icon: Database,
    },
    {
      title: "Wireshark Tutorial for Beginners",
      description: "Learn how to use Wireshark for network analysis and security monitoring.",
      link: "https://www.wireshark.org/docs/",
      category: "network",
      icon: Shield,
    },
  ]

  const filteredResources =
    activeCategory === "all" ? resources : resources.filter((resource) => resource.category === activeCategory)

  return (
    <div className="resources-page">
      <div className="page-header">
        <h1 className="page-title">Learning Resources</h1>
        <p className="page-description">
          Explore our curated collection of cybersecurity learning resources, tutorials, and practice platforms to
          enhance your skills.
        </p>
      </div>

      <div className="resources-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className="category-icon" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource, index) => (
          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-card" key={index}>
            <div className="resource-icon-container">
              <resource.icon className="resource-icon" />
            </div>
            <div className="resource-content">
              <h3 className="resource-title">
                {resource.title}
                <ExternalLink className="external-link-icon" />
              </h3>
              <p className="resource-description">{resource.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

