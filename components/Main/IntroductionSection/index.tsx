import { FC } from 'react'
import WidthClampLayout from '../../../reusable-components/WidthClampLayout'
import styles from './IntroductionSection.module.css'
import clsx from 'clsx'

const IntroductionSection: FC = () => {
  return (
      // <WidthClampLayout>
      //   <section className={styles.container}>
      //     <div className={styles.background}>
      //       <h2 className={styles.text}>hi, my name is</h2>
      //       <h1 className={clsx(styles.dynamic, styles.text)}>
      //         Dawid Piechota
      //       </h1>
      //       <h1 className={styles.text}>
      //         I&apos;m a <span className={styles.highlight}>Frontend Developer</span>
      //       </h1>
      //     </div>
      //   </section>
      // </WidthClampLayout>
      <WidthClampLayout>
        <section className={styles.container}>
          <div className={styles.background}>
            <h2 className={styles.text}>didntidoiforu</h2>
            <h1 className={clsx(styles.dynamic, styles.text)}>
              didiidoitfooou
            </h1>
            <h1 className={styles.text}>
              łenolaidoisforju
            </h1>
            <h1 className={styles.text}>
              kermi
            </h1>
          </div>
        </section>
      </WidthClampLayout>
  )
}

export default IntroductionSection
