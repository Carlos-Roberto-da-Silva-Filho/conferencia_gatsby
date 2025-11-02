# 💻 Conferência Tech: Front-end e Back-end para E-commerce

Este projeto é o site oficial de uma conferência focada em arquiteturas modernas de Front-end e Back-end, especialmente aplicadas ao setor de E-commerce, direcionada ao público de cursos técnicos de ensino médio.

---

## 🎯 Objetivo do Projeto

O site tem como objetivo principal:

* **Apresentar a Grade de Palestras:** Detalhes dos temas, horários e locais.
* **Destacar os Especialistas:** Apresentar a biografia e a especialidade de cada palestrante.
* **Servir como Base de Conhecimento:** Utilizar o formato estático e rápido (JAMstack) para fornecer informações essenciais do evento.

---

## 🛠 Arquitetura e Tecnologias

O projeto é construído sobre a **arquitetura JAMstack** (JavaScript, APIs, Markup), garantindo velocidade, segurança e baixo custo de hospedagem.

### Tecnologias Principais

* **Gatsby (SSG):** Gerador de Site Estático, que compila o React e os arquivos MDX em HTML estático e ultrarrápido.
* **React:** Biblioteca para a construção de componentes de interface reutilizáveis.
* **MDX:** Extensão do Markdown que permite o uso de componentes React dentro do conteúdo, utilizado para criar páginas de palestras e palestrantes de forma dinâmica.
* **CSS Modules:** Para encapsulamento e estilização modular dos componentes.
* **Netlify CMS:** Sistema de Gerenciamento de Conteúdo *headless* (de código aberto), utilizado para a gestão fácil e rápida do conteúdo das palestras e dos palestrantes.

---

## ⚙️ Configuração e Execução Local

Para rodar este projeto em sua máquina local e começar a colaborar ou desenvolver, siga os passos abaixo.

### Pré-requisitos

Você deve ter o **Node.js** (versão LTS recomendada) e o gerenciador de pacotes **npm** (ou Yarn/pnpm) instalados em sua máquina.

### 1. Clonar o Repositório

Abra o terminal e use o `git clone` para baixar o projeto:

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd nome-do-diretorio-do-projeto

npm install
npm run develop
```

### 2. O Site

#### 2.1. Tecnologias Aplicadas

A base deste projeto é construída sobre um conjunto de ferramentas robustas, que trabalham em conjunto para criar um site estático de alta velocidade:

* **Gatsby.js:** Utilizado como o gerador de site estático (SSG), ele orquestra todo o processo de *build* para pré-renderizar o site em arquivos HTML, CSS e JavaScript, garantindo carregamento instantâneo.
* **React:** A fundação para a construção da interface do usuário (UI), permitindo a criação de componentes reutilizáveis e estados gerenciáveis.
* **GraphQL:** Serve como a **única linguagem de consulta** para buscar dados de qualquer fonte (arquivos locais, *APIs*, metadados do site, etc.) e injetá-los nos componentes React durante a fase de *build*. Isso centraliza e simplifica o gerenciamento de informações.
* **MDX:** Extensão do Markdown que permite **escrever código JSX (React)** diretamente dentro de documentos Markdown. A teoria por trás do MDX é transformar texto de conteúdo simples em componentes interativos e dinâmicos, unindo documentação e funcionalidade.
* **Estilização:** Utilizamos **CSS Modules** (arquivos `.module.css`) para garantir que os estilos sejam isolados por componente, evitando conflitos globais de CSS e promovendo um desenvolvimento mais limpo.
* **Tratamento de Imagens (AJUSTADO AQUI):** A otimização de ativos visuais é feita via **`gatsby-plugin-image`**, **`gatsby-plugin-sharp`** e **`gatsby-transformer-sharp`**. Esses plugins transformam imagens brutas em formatos modernos (como WebP), criam múltiplas resoluções (responsividade) e implementam o carregamento lazy-loading e *blur-up* (efeito de transição suave), garantindo performance máxima sem trabalho manual.
* **Implantação:** O **Netlify** é usado para o *Continuous Integration/Continuous Delivery* (CI/CD), automatizando o *deploy* a cada *push* para o GitHub e oferecendo serviços *serverless* como o gerenciamento de formulários.

---

### 2.2. Componentes e Estrutura de Conteúdo

A arquitetura é modular, facilitada pelo uso de componentes e um sistema de roteamento bem definido.

#### **Componentes Chave:**

* **Layout:** O componente estrutural que define o cabeçalho (`Header`), o rodapé e o contêiner central (`.mainContent`), garantindo a consistência visual em todo o site.
* **ContactForm:** Um componente de formulário complexo com gerenciamento de estado e validação em React. Sua implementação é integrada ao Netlify Forms.
* **Header:** O componente de navegação que contém todos os links principais do site.

#### **Links e Rotas (Navegação Principal):**

| Destino | Rota | Descrição da Página |
| :--- | :--- | :--- |
| **Início** | `/` | A página principal do site, contendo a descrição da conferência e a lista das principais tecnologias abordadas. |
| **Palestras** | `/palestras` | Lista as sessões e apresentações técnicas da conferência. |
| **Palestrantes** | `/palestrantes` | Apresenta o perfil e a biografia dos convidados e especialistas. |
| **Local do Evento** | `/local_evento` | Informações logísticas sobre o local, endereço e como chegar. |
| **Contato** | `/contato` | Contém o formulário para envio de mensagens e dúvidas. |
| **Sobre** | `/sobre` | Detalhes sobre a organização, missão e história da conferência. |
| **Mapa do Site** | `/links` | Uma página utilitária que lista todas as rotas navegáveis do site para o usuário. |

---

### 2.3. Funcionalidades e Aplicação Prática

O projeto implementa funcionalidades cruciais que demonstram a capacidade da arquitetura:

##### **Otimização e Visibilidade (SEO)**
* **Teoria:** A gestão de metadados é centralizada e o site segue as diretrizes para rastreamento.
* **Aplicação:** O **`gatsby-config.js`** gerencia o `siteMetadata` via GraphQL. Plugins como **`gatsby-plugin-sitemap`** e **`gatsby-plugin-robots-txt`** são configurados para gerar os arquivos técnicos (`sitemap-index.xml` e `robots.txt`), otimizando o ranqueamento nos motores de busca.

##### **Comunicação Sem Servidor (Netlify Forms)**
* **Teoria:** Uso de formulários declarativos para captura de dados na plataforma de *deployment*.
* **Aplicação:** O **`ContactForm`** utiliza o atributo `data-netlify="true"`. Para sites React/Gatsby que usam `fetch` para o envio, foi adicionado um formulário **HTML "dummy"** (`hidden`) na página de contato para garantir que o Netlify detecte e ative o serviço de captura de submissões com sucesso.

##### **Página de Erro Customizada**
* **Teoria:** Implementação de rotas de *fallback* para melhorar a experiência do usuário.
* **Aplicação:** O arquivo **`404.js`** foi criado usando a estrutura de componentes e estilos do projeto, garantindo que o usuário, ao acessar uma URL inexistente, seja redirecionado para uma página com a identidade visual da conferência.

