import * as React from "react"
import Layout from "../components/Layout"

const IndexPage = () => {
  return (
    <Layout>
      <h1>Conferência Tech 2025</h1>
      <p>Bem-vindo ao evento sobre Front-end e Back-end para E-commerce!</p>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home - Conferência Tech 2025</title>
