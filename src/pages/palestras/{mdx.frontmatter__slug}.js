import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import * as layoutStyles from '../../styles/layout.module.css'

const PalestraDetalhes = ({ data, children }) => { 
  
  if (!data.mdx) {
    return (
      <Layout>
        <main className={layoutStyles.mainContent}>
          <p>Erro: Conteúdo da palestra não encontrado.</p>
        </main>
      </Layout>
    )
  }

  const frontmatter = data.mdx.frontmatter

  return (
    <Layout>
      <main className={layoutStyles.mainContent} style={{margin: '0 auto' }}>
        
        {/* Título Principal da Palestra */}
        <h1>{frontmatter.titulo}</h1>

        {/* Informações de Agendamento */}
        <div style={{ marginBottom: '2rem', borderLeft: '3px solid #007acc', paddingLeft: '15px' }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
            {frontmatter.dia} às {frontmatter.hora}
          </p>
          <p style={{ margin: 0 }}>
            Local: {frontmatter.local}
          </p>
          <p style={{ margin: 0 }}>
            Palestrante: {frontmatter.palestrante}
          </p>
        </div>

        <div style={{ textAlign: 'justify' }}>
          {children} 
        </div>

        {/* Botão de Volta */}
        <div style={{ marginTop: '3rem' }}>
          <a href="/palestras/" style={{ color: '#007acc', textDecoration: 'none', fontWeight: 'bold' }}>
            &laquo; Voltar para a Grade Completa
          </a>
        </div>
      </main>
    </Layout>
  )
}

// Query GraphQL para buscar os dados de uma ÚNICA palestra
export const query = graphql`
  query DetalhesDaPalestra($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        titulo
        palestrante
        dia
        hora
        local
      }
    }
  }
`

export default PalestraDetalhes

export const Head = ({ data }) => (
  <title>{data.mdx?.frontmatter.titulo} | Conferência Tech</title>
)