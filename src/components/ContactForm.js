import React, { useState } from 'react';
import * as formStyles from '../styles/ContactForm.module.css'; 

// Componente simples de formulário de contato
const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Função para tratar com a mudança nos campos
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Limpa o erro ao digitar
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  // Função de Validação dos Campos
  const validate = () => {
    let newErrors = {};

    if (!form.name) {
      newErrors.name = 'O nome é obrigatório.';
    }
    if (!form.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'O e-mail não é válido.';
    }
    if (!form.message) {
      newErrors.message = 'A mensagem é obrigatória.';
    } else if (form.message.length < 5) {
      newErrors.message = 'A mensagem deve ter pelo menos 5 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função auxiliar para codificar dados do formulário
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  // Função para lidar com o envio
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('');

    if (!validate()) {
      setSubmitMessage('Por favor, corrija os erros nos campos.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Envio para Netlify Forms
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...form }) 
    })
    .then(() => {
      setSubmitMessage('Sua mensagem foi enviada com sucesso! Obrigado.');
      setForm({ name: '', email: '', message: '' }); 
      setErrors({});
    })
    .catch(error => {
      console.error(error);
      setSubmitMessage('Ocorreu um erro ao tentar enviar sua mensagem. Tente novamente.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <form 
      className={formStyles.form} 
      name="contact" 
      method="POST" 
      data-netlify="true" // Habilita a captura pelo Netlify
      onSubmit={handleSubmit}
    >
      {/* Esconder campos do Netlify: essencial para a captura funcionar */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Campo Nome */}
      <div className={formStyles.control}>
        <label htmlFor="name" className={formStyles.label}>Nome</label>
        <input
          className={`${formStyles.input} ${errors.name ? formStyles.inputError : ''}`}
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className={formStyles.errorText}>{errors.name}</p>}
      </div>

      {/* Campo E-mail */}
      <div className={formStyles.control}>
        <label htmlFor="email" className={formStyles.label}>E-mail</label>
        <input
          className={`${formStyles.input} ${errors.email ? formStyles.inputError : ''}`}
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className={formStyles.errorText}>{errors.email}</p>}
      </div>

      {/* Campo Mensagem */}
      <div className={formStyles.control}>
        <label htmlFor="message" className={formStyles.label}>Mensagem</label>
        <textarea
          className={`${formStyles.input} ${errors.message ? formStyles.inputError : ''}`}
          id="message"
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
        />
        {errors.message && <p className={formStyles.errorText}>{errors.message}</p>}
      </div>

      {/* Botão de Envio */}
      <button 
        className={formStyles.submitButton} 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
      
      {/* Mensagem de Feedback */}
      {submitMessage && (
        <p className={submitMessage.includes('sucesso') ? formStyles.successText : formStyles.errorText}>
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;