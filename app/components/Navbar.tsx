import React from 'react';
import Link from 'next/link'; // If you're using Next.js for navigation
import styles from '../Navbar.module.css'; // Import CSS module for styling

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">EMS Dashboard</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Map</Link>
        </li>
        <li>
          <Link href="/tileTest">Action Plans</Link>
        </li>
        <li>
          <Link href="/services">Resource Manager</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
