import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useHeaderPosition, {
  HeaderPosition,
} from '../../hooks/useHeaderPosition';
import styles from './Navbar.module.css';
import clsx from 'clsx';

const NavBar: NextPage = () => {
  const headerPosition = useHeaderPosition();

  return (
    <header
      className={clsx(styles.header, {
        [styles['header-hidden']]: headerPosition === HeaderPosition.HIDDEN,
        [styles['header-sticky']]: headerPosition === HeaderPosition.STICKY,
      })}
    >
      <nav className={styles['logo-and-list-container']}>
        <div className={styles.logo}>
          <Link href="/">
            [DP]
          </Link>
        </div>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link legacyBehavior={false} className={styles.link} href="/">
              Home
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} href="/">
              About
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} href="/">
              Skills
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} href="/">
              Projects
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} href="/">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
