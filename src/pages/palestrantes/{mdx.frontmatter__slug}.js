import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../../components/Layout" 
import * as styles from "../../styles/layout.module.css"

const PalestranteTemplate = ({ data, children }) => {
  const { mdx } = data 
  if (!mdx) {
    return (
      <Layout>
        <main className={styles.mainContent}>
          <p>Erro: Conteúdo do palestrante não encontrado.</p>
        </main>
      </Layout>
    )
  }

  const frontmatter = mdx.frontmatter
  
  // Garantir que a imagem exista antes de chamar getImage
  const image = frontmatter.foto ? getImage(frontmatter.foto) : null
  
  // Definindo o caminho de volta para a lista de palestrantes
  const backLinkPath = "/palestrantes/" 

  return (
    <Layout>
      <main className={styles.mainContent}>
        
        {/* Renderiza o nome como título principal */}
        {frontmatter.nome && <h1 style={{ textAlign: 'center' }}>{frontmatter.nome}</h1>}

        {/* Renderiza a imagem do palestrante se existir */}
        {image && (
          <div style={{ display: "flex", justifyContent: "center", margin: "1rem auto" }}>
            <GatsbyImage 
              image={image} 
              alt={`Foto do(a) palestrante ${frontmatter.nome}`} 
              imgStyle={{ borderRadius: "50%" }}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
            />
          </div>
        )}

        
        {frontmatter.cargo && frontmatter.empresa && (
          <p style={{ textAlign: "center", fontStyle: "italic", marginBottom: "1.5rem" }}>
            {frontmatter.cargo} na {frontmatter.empresa}
          </p>
        )}
        
        {/* Conteúdo MDX (Biografia) */}
        {children}
        
        <hr style={{ margin: "2rem auto", width: "80%", borderTop: "1px solid #ddd" }} />
        
        {/* Detalhes da Palestra */}
        {frontmatter.tema && (
          <div style={{ padding: "1rem", border: "1px solid #eee", borderRadius: "8px" }}>
             <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>Detalhes da Palestra</h2>
             <ul style={{ listStyleType: 'none', paddingLeft: 0, textAlign: 'left', margin: 0 }}>
                {frontmatter.tema && <li><strong>Tema:</strong> {frontmatter.tema}</li>}
                {frontmatter.dia && <li><strong>Data:</strong> {frontmatter.dia}</li>}
                {frontmatter.hora && <li><strong>Hora:</strong> {frontmatter.hora}</li>}
                {frontmatter.local && <li><strong>Local:</strong> {frontmatter.local}</li>}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '3rem' }}>
          <a href={backLinkPath} style={{ color: '#007acc', textDecoration: 'none', fontWeight: 'bold' }}>
            &laquo; Voltar para a Lista de Palestrantes
          </a>
        </div>
        
      </main>
    </Layout>
  )
}

export default PalestranteTemplate

export const query = graphql`
  query GetPalestranteContent($id: String!) {
    mdx(
      id: { eq: $id }
      internal: { contentFilePath: { regex: "/content/palestrantes/.*/" } }
    ) {
      frontmatter {
        slug
        nome
        cargo
        empresa
        tema
        dia
        hora
        local
        
        foto {
          childImageSharp {
            gatsbyImageData(
              width: 300
              height: 300
              placeholder: BLURRED
              transformOptions: {fit: COVER, cropFocus: CENTER}
            )
          }
        }
      }
    }
  }
`

// Head Export
export const Head = ({ data }) => (
  <title>
    {data.mdx?.frontmatter.nome || "Palestrante"} - Conferência Tech
  </title>
)