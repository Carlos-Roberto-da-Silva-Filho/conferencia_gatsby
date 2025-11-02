// src/pages/links.js
import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import * as layoutStyles from "../styles/layout.module.css"; 

const LinksPage = () => {
  const data = useStaticQuery(graphql`
    query AllPagesQuery {
      allSitePage {
        nodes {
          path
        }
      }
    }
  `);

  // Filtra rotas que não são para o usuário (como o 404 e caminhos internos)
  const userPages = data.allSitePage.nodes
    .filter(page => 
      !page.path.includes("/dev-404-page/") && 
      !page.path.includes("/404/") &&
      page.path !== "/404.html"
    )
    .sort((a, b) => a.path.localeCompare(b.path));

  return (
    <Layout>
      <div className={layoutStyles.mainContent}>
        <h1>Mapa do Site (Links Úteis)</h1>
        
        <p>
          Aqui está a lista completa das principais rotas disponíveis em nosso website para facilitar sua navegação.
        </p>

        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {userPages.map((page, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              <Link 
                to={page.path} 
                style={{ 
                  fontSize: '1.2rem', 
                  color: '#4478e7d0',
                  fontWeight: 'bold', 
                  textDecoration: 'none',
                  lineHeight: '1.4' 
                }}
              >
                {/* Exibimos o path, e se for a raiz, chamamos de Home */}
                {page.path === "/" ? "Página Inicial (Home)" : page.path}
              </Link>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: '40px' }}>
          <small>
            Para rastreamento por motores de busca, consulte o arquivo técnico: 
            <a 
              href="/sitemap-index.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#007acc' }}
            >
              /sitemap-index.xml
            </a>
          </small>
        </p>
      </div>
    </Layout>
  );
};

export default LinksPage;

export const Head = () => (
    <>
        <title>Mapa do Site e Links | Conferência</title>
        <meta name="description" content="Lista completa de todas as páginas e rotas do site da conferência." />
    </>
);