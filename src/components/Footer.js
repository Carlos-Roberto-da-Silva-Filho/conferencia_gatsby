import * as React from "react"
import * as styles from "../styles/layout.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 Conferência Tech - Todos os direitos reservados</p>
      <div className={styles.socialLinks}>
        <a
          className={styles.socialIcon}
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className={styles.socialIcon}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          className={styles.socialIcon}
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </footer>
  )
}

export default Footer
