import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import styles from "./WelcomeMessage.module.css"

interface WelcomeMessageProps {
  visible: boolean
}

export default function WelcomeMessage({ visible }: WelcomeMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          onComplete: () => {
            if (messageRef.current) {
              messageRef.current.style.animation = "glowPulse 2s infinite"
            }
          },
        },
      )
    }
  }, [visible])

  if (!visible) return null

  return (
    <div id="info" ref={messageRef} className={styles.welcomeMessage}>
      WELCOME TO CYBERSEC RVU
    </div>
  )
}

