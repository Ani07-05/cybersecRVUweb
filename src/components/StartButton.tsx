import styles from "./StartButton.module.css"

interface StartButtonProps {
  onClick: () => void
}

export default function StartButton({ onClick }: StartButtonProps) {
  return (
    <button 
      className={styles.startButton} 
      onClick={onClick}
    >
      Initiate Sequence
    </button>
  )
}