/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Conferência Técnica de Desenvolvimento de Sistemas`,
    description: `Apresentação de projetos e estudos de caso em 
                      desenvolvimento WEB voltados para E-commerce.`,
    author: `Carlos Roberto da Silva Filho`,
    siteUrl: `https://conferencia-gatsby.netlify.app/`,
  },

  plugins: [
    // ================================
    // CSS Modules e imagens
    // ================================
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // ================================
    // Suporte a MDX
    // ================================
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    // ================================
    // SEO / METADADOS
    // ================================
    // 1. Plugin de Sitemap (usa o siteMetadata.siteUrl para criar o mapa do site)
    `gatsby-plugin-sitemap`,
    
    // 2. Plugin de Robots.txt
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://conferencia-gatsby.netlify.app/', // O mesmo URL do siteMetadata
        sitemap: 'https://conferencia-gatsby.netlify.app/sitemap-index.xml',
        policy: [
          { userAgent: '*', allow: '/' } // Permite o rastreamento completo
        ]
      }
    },

    // ================================
    // Fonte de dados para CONTEÚDO MDX
    // ================================
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
  ],
};
