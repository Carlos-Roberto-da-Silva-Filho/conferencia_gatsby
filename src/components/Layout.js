import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"
import * as styles from "../styles/layout.module.css"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
