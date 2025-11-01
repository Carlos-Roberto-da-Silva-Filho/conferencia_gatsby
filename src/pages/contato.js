// src/pages/contato.js
import React from 'react';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const ContatoPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Entre em Contato</h1>
        <p>Preencha o formulário abaixo para enviar sua mensagem. Responderemos o mais breve possível!</p>
        <ContactForm />
      </div>
    </Layout>
  );
};

export default ContatoPage;


export const Head = () => (
    <>
        <title>Contato | Conferência Tech</title>
        <meta name="description" content="Página de contato para tirar dúvidas sobre a conferência." />
    </>
);