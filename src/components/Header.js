import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/layout.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/">Início</Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/palestras">Palestras</Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/palestrantes">Palestrantes</Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/contato">Contato</Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/sobre">Sobre</Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/local_evento">Local do Evento</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
