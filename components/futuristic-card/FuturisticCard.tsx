'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaCar } from 'react-icons/fa'
import styles from './FuturisticCard.module.css'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function FuturisticCard() {
  const [name, setName] = useState('MERN')
  const [isHovered, setIsHovered] = useState(false)

  const scrambleText = useCallback(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setName(prev => 
        prev.split('').map((letter, index) => {
          if (index < iteration) {
            return 'MERN'[index]
          }
          return letters[Math.floor(Math.random() * 26)]
        }).join('')
      )

      iteration += 1 / 3
      if (iteration >= 'MERN'.length) {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className={styles.screen}
      onHoverStart={() => {
        setIsHovered(true)
        scrambleText()
      }}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.screenImage}></div>
      <div 
        className={styles.screenOverlay}></div>
      <div className={styles.screenContent}>
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaCar className={styles.screenIcon} />
        </motion.div>
        <div className={styles.screenUser}>
          <motion.span 
            className={styles.name}
            animate={{ textShadow: isHovered ? '0px 0px 8px rgba(255,255,255,0.8)' : '0px 0px 0px rgba(255,255,255,0)' }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}