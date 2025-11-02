import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import * as layoutStyles from "../styles/layout.module.css";

const HomePage = () => {
  const data = useStaticQuery(graphql`
    query SiteInfoQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const { title, description } = data.site.siteMetadata;

  return (
    <Layout>
      <div className={layoutStyles.mainContent}>

        <section className={layoutStyles.heroSection}>
          <h1>{title}</h1>
          <p className={layoutStyles.heroDescription}>
            {description}
          </p>
          <Link
            to="/contato"
            className={layoutStyles.buttonPrimary}
          >
            Inscreva-se Agora
          </Link>
        </section>

        <section className={layoutStyles.generalSection}>
          <h2>O que esperar da Conferência?</h2>

          <p>
            A Conferência Técnica de Desenvolvimento de Sistemas é o evento obrigatório
            para desenvolvedores e arquitetos que buscam as melhores práticas em
            desenvolvimento WEB moderno, com foco especial em soluções de E-commerce
            de alta performance. Serão três dias de imersão completa em tecnologias
            JAMstack, arquitetura de microsserviços e estratégias de SEO avançado.
          </p>

          <p>
            Nossos palestrantes são líderes de mercado, apresentando estudos de caso reais
            e workshops práticos sobre a otimização de performance e a experiência do usuário
            em plataformas de comércio eletrônico.
          </p>

          <h2>Principais Tecnologias:</h2>
          <ul className="mainContent">
            <li>HTML5 e CSS3: estruturação e estilização de interfaces responsivas e acessíveis.</li>
            <li>JavaScript (ES6+): base para interatividade e manipulação dinâmica de conteúdo.</li>
            <li>React e Gatsby: frameworks para criação de aplicações modernas, rápidas e escaláveis.</li>
            <li>Fetch API: comunicação eficiente com serviços e APIs externas.</li>
            <li>Node.js e Express.js: desenvolvimento de aplicações backend e APIs RESTful.</li>
            <li>Sequelize ou Prisma: abstração e gerenciamento simplificado de bancos de dados.</li>
            <li>MySQL e PostgreSQL: sistemas de banco de dados relacionais para armazenamento seguro.</li>
            <li>bcrypt e JWT: autenticação e criptografia voltadas à segurança da informação.</li>
            <li>Chart.js e Recharts: visualização interativa de dados e métricas.</li>
            <li>Git e GitHub: versionamento e colaboração no desenvolvimento de projetos web.</li>
          </ul>

          <p style={{ marginTop: '10px' }}>
            Mapa do site:
            <Link to="/links" className={layoutStyles.simpleLink}> Links</Link>
          </p>

        </section>

      </div>
    </Layout>
  );
};

export default HomePage;

export const Head = () => (
  <>
    <title>Home | Conferência Técnica de Desenvolvimento</title>
    <meta name="description" content="Site oficial da Conferência Técnica de Desenvolvimento de Sistemas, focada em WEB e E-commerce." />
  </>
);