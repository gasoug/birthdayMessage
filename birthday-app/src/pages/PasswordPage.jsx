import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PasswordPage.module.css'

const SENHA = '260795anurb'

export default function PasswordPage() {
  const [valor, setValor] = useState('')
  const [erro, setErro] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const tentar = () => {
    if (valor === SENHA) {
      setSaindo(true)
      setTimeout(() => navigate('/surprise'), 600)
    } else {
      setErro(true)
      setValor('')
      setTimeout(() => {
        setErro(false)
        inputRef.current?.focus()
      }, 700)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') tentar()
  }

  return (
    <div className={`${styles.page} ${saindo ? styles.saindo : ''}`}>
      <div className={styles.box}>
        <div className={styles.lockIcon}>🔒</div>
        <p className={styles.hint}>Esta mensagem é só pra você 🤫</p>

        <div className={`${styles.inputWrap} ${erro ? styles.shake : ''}`}>
          <input
            ref={inputRef}
            className={`${styles.input} ${erro ? styles.inputErro : ''}`}
            type="password"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite o código"
            autoFocus
            autoComplete="off"
          />
        </div>

        {erro && <p className={styles.erroMsg}>Código incorreto</p>}

        <button className={styles.btn} onClick={tentar}>
          Continuar →
        </button>
      </div>
    </div>
  )
}
