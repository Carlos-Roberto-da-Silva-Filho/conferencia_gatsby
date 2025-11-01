/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Conferência Técnica de Desenvolvimento de Sistemas`,
    description: `Apresentação de projetos e estudos de caso em 
                      desenvolvimento WEB voltados para E-commerce.`,
    author: `Curso Técnico de Desenvolvimento de Sistemas`,
    siteUrl: `https://www.seusite.com`,
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
