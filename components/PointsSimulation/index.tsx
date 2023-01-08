'use client';
import { useRef, useEffect, FC } from 'react'
import useRandomisePrimaryColorOnRPress from '../../hooks/useRandomisePrimaryColorOnRPress'
import styles from './PointsSimulation.module.css'
import { renderAnimation } from './utils/script'

const PointsSimulation: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useRandomisePrimaryColorOnRPress();

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    renderAnimation(canvas);
  }, [])

  return <canvas className={styles.canvas} ref={canvasRef} />
}

export default PointsSimulation
