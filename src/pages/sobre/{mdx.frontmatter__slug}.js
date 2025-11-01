import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import * as styles from "../../styles/layout.module.css"


const SobreTemplate = ({ data, children }) => { 
  const { mdx } = data

  if (!mdx) {
    return (
      <Layout>
        <main className={styles.mainContent}>
          <p>Erro: conteúdo não encontrado.</p>
        </main>
      </Layout>
    )
  }

  const frontmatter = mdx.frontmatter

  return (
    <Layout>
      <main className={styles.mainContent}>
        <h1 style={{ textAlign: "center" }}>{frontmatter.titulo}</h1>
        <div style={{ margin: "2rem auto", textAlign: "justify" }}>
          {children} 
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query GetSobreContent($id: String!) {
    mdx(
      id: { eq: $id }
      internal: { contentFilePath: { regex: "/content/sobre/.*/" } }
    ) {
      frontmatter {
        slug
        titulo
      }
    }
  }
`

export const Head = ({ data }) => (
  <title>{data.mdx?.frontmatter.titulo || "Sobre"} - Conferência Tech</title>
)

export default SobreTemplate