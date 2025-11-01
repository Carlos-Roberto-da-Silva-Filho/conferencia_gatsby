import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout"
import * as layoutStyles from "../../styles/layout.module.css"
import * as palestrantesStyles from "../../styles/palestrantes.module.css"

const SobrePage = ({ data }) => {
  const sobreItens = data.allMdx.nodes

  return (
    <Layout>
      <main className={layoutStyles.mainContent} style={{ textAlign: 'center' }}>
        <h1>Sobre a Conferência</h1>
        <h3 className={layoutStyles.mainContent} style={{ marginBottom: '2rem' }}>
          Conheça mais sobre o propósito e os detalhes da nossa conferência.
        </h3>

        <div className={palestrantesStyles.palestrantesGrid}>
          {sobreItens.map(item => (
            <div key={item.id} className={palestrantesStyles.palestranteCard}>
              <Link to={`/sobre/${item.frontmatter.slug}`} className={palestrantesStyles.palestranteLink}>
                <h2>{item.frontmatter.titulo}</h2>
              </Link>
              <p>{item.frontmatter.descricao}</p>
              <Link
                to={`/sobre/${item.frontmatter.slug}`}
                className={palestrantesStyles.detalhesLink}
              >
                Ler mais »
              </Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query ListarSobre {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/sobre/" } } }
      sort: { frontmatter: { titulo: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          slug
          titulo
          descricao
        }
      }
    }
  }
`

export default SobrePage

export const Head = () => <title>Sobre - Conferência Tech</title>
