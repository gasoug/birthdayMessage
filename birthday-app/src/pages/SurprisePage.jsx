import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SurprisePage.module.css'

const IMAGEM = '/monkey.png'

export default function SurprisePage() {
  const navigate = useNavigate()
  const navigated = useRef(false)

  const handleClick = () => {
    if (navigated.current) return
    navigated.current = true
    navigate('/message')
  }

  return (
    <div className={styles.stage} onClick={handleClick}>
      <img
        className={styles.image}
        src={IMAGEM}
        alt="Surpresa"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          document.querySelector(`.${styles.placeholder}`).style.display = 'flex'
        }}
      />

      {/* Fallback quando a imagem não for encontrada */}
      <div className={styles.placeholder} style={{ display: 'none' }}>
        <span className={styles.placeholderIcon}>🖼️</span>
        <span className={styles.placeholderText}>
          Adicione sua imagem em <code>public/surprise.jpg</code>
        </span>
      </div>

      {/* Cortina que sobe revelando a imagem de baixo para cima */}
      <div className={styles.curtain} />

      {/* Dica que aparece depois da revelação */}
      <div className={styles.tapHint}>
        <span>BRINCADEIRA, toca na tela de novo</span>
        <span className={styles.sparkle}>😊</span>
      </div>
    </div>
  )
}
