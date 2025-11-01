// src/pages/404.js
import * as React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby"; 
import * as layoutStyles from "../styles/layout.module.css"; 

const NotFoundPage = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '50px 20px', minHeight: '60vh' }}>
        
        {/* Usando CSS inline mínimo para texto, já que .mainContent estiliza h1/p */}
        <h1 style={{ fontSize: '2.5rem', color: '#e74c3c', marginBottom: '15px' }}>
          404 | Página Não Encontrada
        </h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#555' }}>
          Ops! O recurso que você tentou acessar não está disponível.
          Verifique o endereço digitado.
        </p>
        
        <Link 
          to="/" 
          className={layoutStyles.buttonPrimary} 
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => (
    <>
        <title>404 | Página Não Encontrada</title>
        <meta name="description" content="Página de erro 404. O recurso solicitado não foi encontrado." />
    </>
);