import { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import styles from './QRPage.module.css'

function getSurpriseUrl() {
  const base = window.location.href.split('#')[0]
  return base + '#/surprise'
}

export default function QRPage() {
  const [url, setUrl] = useState('')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const detected = getSurpriseUrl()
    setUrl(detected)
    setInputValue(detected)
  }, [])

  const handleGenerate = () => {
    const trimmed = inputValue.trim()
    if (trimmed) setUrl(trimmed)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate()
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>🎂</div>
          <h1 className={styles.title}>Feliz Aniversário</h1>          
        </div>

        <div className={styles.qrWrapper}>
          {url && (
            <QRCodeCanvas
              value={url}
              size={240}
              level="H"
              bgColor="#ffffff"
              fgColor="#08080f"
            />
          )}
        </div>

        <div className={styles.urlSection}>
          <label className={styles.label}>URL da página da surpresa</label>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cole aqui a URL onde está hospedado..."
            />
            <button className={styles.btn} onClick={handleGenerate}>
              Gerar
            </button>
          </div>
        </div>        
      </div>
    </div>
  )
}
