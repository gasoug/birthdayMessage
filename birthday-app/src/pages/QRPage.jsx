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
          <h1 className={styles.title}>Repi bardei tiu iu</h1>          
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

        
        
      </div>
    </div>
  )
}
