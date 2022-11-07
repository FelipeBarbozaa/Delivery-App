<details>
  <summary>
    <strong>:memo: Sobre o projeto</strong>
  </summary><br>

  - Último projeto desenvolvido no módulo de back-end da Trybe.
 
  - Tive a experiência de fazê-lo com outros 3 estudantes, porém decidi recriá-lo sozinho adicionando Docker, TypeScript e POO com o intúito de praticar.
  
  - O projeto contém 3 tipos de autenticação (usuário, vendedor e administrador), contando com proteção para essas rotas no front e back.
</details>
  
<details>
  <summary>
    <strong>:wrench: Tecnologias e bibliotecas utilizadas</strong>
  </summary><br>
  
  <strong>Front-end</strong>

  - HTML5
  - CSS3
  - JavaScript
  - React
  - Joi
  - Moment.js
  
  <strong>Back-end</strong>
  
  - Node.js
  - Express.js
  - Bcrypt.js
  - Joi
  - JWT
  - MySQL
  - Sequelize
  - NodeMailer
  - TypeScript

  Além de que todo projeto foi desenvolvido em containers Docker e com ESLint para estilização.
  
</details>

<details>
  <summary>
    <strong>:railway_track:	Fluxo da aplicação</strong>
  </summary><br>
  
  <strong>Fluxo Comum</strong>

  - Tela de login: /login;
  - Tela de registro: /register;
  
  <strong>Fluxo do cliente</strong>

  - Tela de produtos: /customer/products;
  - Tela de checkout: /customer/checkout;
  - Tela de pedidos: /customer/orders;
  - Tela de detalhes do pedido: /customer/orders/:id
  
  <strong>Fluxo do vendedor</strong>

  - Tela de pedidos: /seller/orders
  - Tela de detalhes do pedido /seller/orders/:id
  
  <strong>Fluxo do administrador</strong>

  - Tela de gerenciamento de usuários: /admin/manage;
</details>
