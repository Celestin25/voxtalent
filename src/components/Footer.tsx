import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.column}>
          <h3 className={styles.logo}>VoxTalent</h3>
          <p className={styles.tagline}>
            The recruitment platform built on the science of collective intelligence and verified merit.
          </p>
          <div className={styles.socials}>
            <Link href="#" className={styles.socialIcon}><Twitter size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><Linkedin size={20} /></Link>
            <Link href="#" className={styles.socialIcon}><Github size={20} /></Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Platform</h4>
          <Link href="/challenges" className={styles.link}>All Challenges</Link>
          <Link href="/how-it-works" className={styles.link}>Methodology</Link>
          <Link href="/about" className={styles.link}>About Us</Link>
        </div>

        <div className={styles.column}>
          <h4>Company</h4>
          <Link href="/about" className={styles.link}>About Us</Link>
          <Link href="/signup?role=company" className={styles.link}>For Companies</Link>
          <Link href="/#contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <a href="mailto:support@voxtalent.com" className={styles.contactLink}>
            <Mail size={16} /> support@voxtalent.com
          </a>
          <p className={styles.address}>
            World Trade Center<br />
            New York, NY 10007
          </p>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} VoxTalent. Built for better hiring through truth.</p>
        </div>
      </div>
    </footer>
  );
}
