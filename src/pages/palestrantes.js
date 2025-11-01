import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import * as layoutStyles from "../styles/layout.module.css" //  estilos gerais
import * as palestrantesStyles from "../styles/palestrantes.module.css"

const PalestrantesPage = ({ data }) => {
  const palestrantes = data.allMdx.nodes

  return (
    <Layout>
      <main className={layoutStyles.mainContent} style={{ textAlign: 'center' }}>
        <h1>Palestrantes</h1>
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Conheça os especialistas que farão parte da Conferência Tech.</h3>

        {/* Aplica a classe da grade do CSS Module */}
        <div className={palestrantesStyles.palestrantesGrid}>
          {palestrantes.map(palestrante => (
            /* Aplica a classe do card do CSS Module */
            <div key={palestrante.id} className={palestrantesStyles.palestranteCard}>
              
              <Link to={palestrante.frontmatter.slug} className={palestrantesStyles.palestranteLink}>
                <h2>{palestrante.frontmatter.nome}</h2>
              </Link>
              
              <p style={{ fontStyle: 'italic' }}>
                {palestrante.frontmatter.cargo}
              </p>
              
              <p>
                Tema: {palestrante.frontmatter.tema}
              </p>
              
              <Link 
                to={palestrante.frontmatter.slug} 
                className={palestrantesStyles.detalhesLink}
              >
                Ver Detalhes »
              </Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query ListarPalestrantes {
    allMdx(
      # Filtra apenas os arquivos MDX que estão na pasta 'palestrantes'
      filter: { internal: { contentFilePath: { regex: "/content/palestrantes/" } } }
      sort: { frontmatter: { nome: ASC } }
    ) {
      nodes {
        id
        frontmatter {
          nome
          slug
          cargo
          tema
        }
      }
    }
  }
`

export default PalestrantesPage

export const Head = () => <title>Palestrantes - Conferência Tech</title>