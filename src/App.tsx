import { useState, useEffect } from 'react'
import './App.css'
import dishu from './assets/dishu.png'
import hit from './assets/hit.png'

function App() {
  const [moles, setMoles] = useState(Array(9).fill(false))
  const [score, setScore] = useState(0)
  const [hitIndex, setHitIndex] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newMoles = Array(9).fill(false)
      const randomIndex = Math.floor(Math.random() * 9)
      newMoles[randomIndex] = true
      setMoles(newMoles)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const hitMole = (index: number) => {
    if (moles[index]) {
      setScore(score + 1)
      setHitIndex(index)
      const newMoles = [...moles]
      newMoles[index] = false
      setMoles(newMoles)
      setTimeout(() => setHitIndex(null), 500)
    }
  }

  return (
    <div className="game">
      <h1>打地鼠游戏</h1>
      <p>得分: {score}</p>
      <div className="grid">
        {moles.map((mole, index) => (
          <div
            key={index}
            className={`mole ${mole ? 'active' : ''}`}
            onClick={() => hitMole(index)}
          >
            {(mole || hitIndex === index) && (
              <img src={hitIndex === index ? hit : dishu} alt="地鼠" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
