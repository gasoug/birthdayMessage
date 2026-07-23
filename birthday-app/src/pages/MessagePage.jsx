import { useState, useEffect, useRef } from 'react'
import styles from './MessagePage.module.css'

// ============================================================
// PERSONALIZE AQUI — edite o roteiro da mensagem
//
// Tipos de passo:
//   { t: 'type', text: '...' }        → digita o texto
//   { t: 'backspace', count: N }       → apaga N caracteres
//   { t: 'newline' }                   → quebra de linha
//   { t: 'pause', ms: N }             → pausa em milissegundos
//   { t: 'done' }                      → dispara confete no final
// ============================================================

const ROTEIRO = [
  { t: 'pause', ms: 800 },

  { t: 'type', text: 'Oi, ' },
  // ← troque "Ana" pelo nome da pessoa
  { t: 'type', text: 'Bruna' },
  { t: 'type', text: '!' },

  { t: 'newline' },
  { t: 'newline' },
  { t: 'pause', ms: 1000 },

  { t: 'type', text: 'Espero que você consiga aproveitar ao máximo o seu dia e que ele seja tão incrível quanto você — embora eu saiba que poucas coisas podem ser invríveis assim — ' },

  { t: 'newline' },
  { t: 'newline' },
  { t: 'pause', ms: 2200 },

  { t: 'type', text: 'agradeça por me ter na sua vida por tanto tempo' },  // typo: pesssoa (7 chars)
  { t: 'pause', ms: 500 },
  { t: 'backspace', count: 47 },
  { t: 'type', text: 'agradeço por me fazer querer não ser menos do q' },  
  { t: 'type', text: 'ue a forma que sou aos seus olhos.' },

  { t: 'newline' },
  { t: 'newline' },
  { t: 'pause', ms: 1400 },

  { t: 'type', text: 'Obrigado pelas ' },    
  { t: 'type', text: 'paranóias' },
  { t: 'pause', ms: 600 },
  { t: 'backspace', count: 9 },
  { t: 'type', text: 'conversas, momentos, risadas, desentendimentos e por ser tão' },
  { t: 'type', text: 'doida às vezes' },
  { t: 'pause', ms: 600 },
  { t: 'backspace', count: 14 },
  { t: 'type', text: 'importante pra mim.' },

  { t: 'newline' },
  { t: 'newline' },
  { t: 'pause', ms: 1200 },

  { t: 'type', text: 'Quando se sentir incapaz ou quando pensamentos ruins sobre você surgirem, lembre-se de tudo que o que já superou, do que é essencial pra você e entenda que sim, você é e sempre foi muito ' },  
  { t: 'type', text: 'foda ' },
  { t: 'pause', ms: 400 },
  { t: 'backspace', count: 4 },
  { t: 'type', text: 'capaz.' },

  { t: 'newline' },
  { t: 'newline' },
  { t: 'type', text: 'Que seus desejos e objetivos se realizem, e que você seja feliz da forma que almeja e merece neste novo ciclo. Que Deus venha te ' }, 
  { t: 'type', text: 'ençaboar' },
  { t: 'pause', ms: 400 },
  { t: 'backspace', count: 8 },
  { t: 'type', text: 'abençoar cada dia mais, hoje e sempre!' },
  { t: 'pause', ms: 1000 },

  { t: 'type', text: 'Feliz vida, Bruna 💜' },

  { t: 'pause', ms: 600 },
  { t: 'done' },
]

// ─── Motor de digitação ───────────────────────────────────────

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function runScript(roteiro, setText, setDone, abortRef) {
  const chars = []

  for (const step of roteiro) {
    if (abortRef.current) break

    if (step.t === 'type') {
      for (const char of [...step.text]) {
        if (abortRef.current) break
        chars.push(char)
        setText(chars.join(''))
        let delay = 38 + Math.random() * 70
        if ('.,!?…'.includes(char)) delay += 160 + Math.random() * 180
        await wait(delay)
      }
    } else if (step.t === 'backspace') {
      for (let i = 0; i < step.count; i++) {
        if (abortRef.current) break
        chars.pop()
        setText(chars.join(''))
        await wait(38 + Math.random() * 22)
      }
    } else if (step.t === 'newline') {
      chars.push('\n')
      setText(chars.join(''))
    } else if (step.t === 'pause') {
      await wait(step.ms)
    } else if (step.t === 'done') {
      setDone(true)
    }
  }
}

// ─── Confete ─────────────────────────────────────────────────

function launchConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const COLORS = ['#ff9a9e', '#c4a1ff', '#ffeaa7', '#74b9ff', '#fd79a8', '#55efc4']

  const particles = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: -30 - Math.random() * 120,
    vx: (Math.random() - 0.5) * 3.5,
    vy: 2.5 + Math.random() * 2.5,
    rot: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 9,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    w: 9 + Math.random() * 7,
    h: 4 + Math.random() * 4,
    alpha: 1,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.06
      p.rot += p.rotV
      if (p.y > canvas.height * 0.75) p.alpha -= 0.012
      if (p.alpha <= 0) continue
      alive = true
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.alpha)
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rot * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }
    if (alive) requestAnimationFrame(draw)
  }

  draw()
}

// ─── Componente ───────────────────────────────────────────────

export default function MessagePage() {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const abortRef = useRef(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    abortRef.current = false
    runScript(ROTEIRO, setText, setDone, abortRef)
    return () => {
      abortRef.current = true
    }
  }, [])

  useEffect(() => {
    if (done && canvasRef.current) {
      launchConfetti(canvasRef.current)
    }
  }, [done])

  return (
    <div className={styles.page}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.messageBox}>
        <div
          className={styles.text}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {text}
          <span className={done ? styles.cursorHidden : styles.cursor}>|</span>
        </div>
      </div>

      {done && (
        <div className={styles.footer}>
          com todo o carinho 💝
        </div>
      )}
    </div>
  )
}
