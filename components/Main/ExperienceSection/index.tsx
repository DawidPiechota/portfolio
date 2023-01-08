import { FC } from 'react'
import WidthClampLayout from '../../../reusable-components/WidthClampLayout'
import styles from './ExperienceSection.module.css'

const ExperienceSection: FC = () => {
  return (
    <div className={styles.background}>
      <WidthClampLayout>
        <section className={styles.container}>
          <h2 className={styles.text}>Hi 👋</h2>
          <h1 className={styles.text}>
            my name jeff
          </h1>
        </section>
      </WidthClampLayout>
    </div>
  )
}

export default ExperienceSection
