import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useHeaderPosition, { HeaderPosition } from '../../hooks/useHeaderPosition'
import styles from './Navbar.module.css'
import clsx from 'clsx'

const NavBar: NextPage = () => {
  const scrollDirection = useHeaderPosition()

  return (
    <header
      className={clsx(styles.header, {
        [styles['header-hidden']]: scrollDirection === HeaderPosition.HIDDEN,
      })}
    >
      <nav>
        <div className={styles.logo}>
          <Link href="/">[DP]</Link>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
