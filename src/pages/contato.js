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
        
        {/* 1. SEU COMPONENTE REAL DE FORMULÁRIO (com lógica React/Fetch) */}
        <ContactForm />
      </div>

      {/* 2. FORMULÁRIO DUMMY DE HTML PURO (O Netlify precisa deste bloco estático)
        O Netlify escaneia este bloco durante o build para criar o endpoint "contact".
        Seu componente ContactForm (que usa fetch) envia os dados para este endpoint.
      */}
      <form 
        name="contact" 
        data-netlify="true" 
        netlify-honeypot="bot-field"
        hidden // <-- Isso o esconde do usuário
      >
        {/* Os campos aqui devem refletir os campos no seu ContactForm.js */}
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>

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