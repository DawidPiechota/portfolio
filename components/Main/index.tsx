import { FC } from 'react'
import PointsSimulation from '../PointsSimulation'
import ExperienceSection from './ExperienceSection'
import IntroductionSection from './IntroductionSection'
import styles from './Main.module.css'
const Main: FC = () => {
  return (
    <main className={styles.container}>
      <PointsSimulation />
      <IntroductionSection />
      <ExperienceSection />
      <ExperienceSection />
      <ExperienceSection />
      <ExperienceSection />
    </main>
  )
}

export default Main
