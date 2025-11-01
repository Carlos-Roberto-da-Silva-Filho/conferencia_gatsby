import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import * as layoutStyles from "../styles/layout.module.css"
import * as palestrantesStyles from "../styles/palestrantes.module.css" 

const PalestrasPage = ({ data }) => {
  const palestras = data.allMdx.nodes

  return (
    <Layout>
      <main className={layoutStyles.mainContent} style={{ textAlign: 'center' }}>
        
        {/* Título Principal */}
        <h1>Grade de Palestras</h1>
        
        {/* Descrição Centralizada */}
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Confira a programação completa do evento, temas e horários detalhados.
        </h3>

        {/* Grid de Cards das Palestras */}
        <div className={palestrantesStyles.palestrantesGrid}>
          {palestras.map(palestra => (
            <div key={palestra.id} className={palestrantesStyles.palestranteCard}>
              
              {/* Link para a página de detalhes da palestra */}
              <Link 
                to={`/palestras/${palestra.frontmatter.slug}`} 
                className={palestrantesStyles.palestranteLink}
              >
                {/* Título da Palestra */}
                <h2>{palestra.frontmatter.titulo}</h2>
              </Link>
              
              {/* Informações Rápidas */}
              <p>
                **Palestrante:** {palestra.frontmatter.palestrante}
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
                {palestra.frontmatter.dia} | {palestra.frontmatter.hora}
              </p>
              
              <hr style={{ margin: "10px auto", width: "50%", borderTop: "1px solid #eee" }} />

              {/* Resumo Curto para o Card */}
              <p style={{ textAlign: 'justify', fontSize: '0.95em' }}>
                {palestra.frontmatter.resumo}
              </p>
              
              {/* Botão/Link para ler o conteúdo completo */}
              <Link
                to={`/palestras/${palestra.frontmatter.slug}`}
                className={palestrantesStyles.detalhesLink}
                style={{ display: 'inline-block', marginTop: '1rem' }}
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
  query ListarPalestras {
    allMdx(
      # Filtra APENAS os arquivos MDX que estão em content/palestras/
      filter: { internal: { contentFilePath: { regex: "/content/palestras/" } } }
      # Ordena por dia e hora para seguir a grade do evento
      sort: [{ frontmatter: { dia: ASC } }, { frontmatter: { hora: ASC } }]
    ) {
      nodes {
        id
        frontmatter {
          slug
          titulo
          resumo
          palestrante
          dia
          hora
        }
      }
    }
  }
`

export default PalestrasPage

export const Head = () => <title>Grade de Palestras - Conferência Tech</title>