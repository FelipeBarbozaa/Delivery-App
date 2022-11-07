# Boas vindas ao repositório do projeto App de Delivery!

<details>
  <summary>
    <strong>:memo: Sobre o projeto</strong>
  </summary><br>

  - Último projeto desenvolvido no módulo de back-end da Trybe.
 
  - Tive a experiência de fazê-lo com outros 3 estudantes, porém decidi recriá-lo sozinho adicionando Docker, TypeScript e POO com o intúito de praticar.
  
  - O projeto contém 3 tipos de autenticação (usuário, vendedor e administrador), contando com proteção para essas rotas no front e back.
  
  - Desenvolvido apenas para tela 360x640
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

<details>
  <summary>
    <strong>:gear: Funcionalidades </strong>
  </summary><br>
  
  <strong>Cliente</strong>

   - Terá acesso apenas ao fluxo do cliente.
   - Pode se cadastrar, onde terá que ativar seu cadastro por um link enviado no email...Assim que ativado, será redirecionado à pagina principal de cliente já logado.
   - Pode criar um pedido.
   - Pode ver todos os seus pedidos e os detalhes de cada um, onde mostra algumas informações como o status daquele pedido.
   - Pode confirmar o recebimento do pedido, atualizando seu status para "Entegue".
  
  <strong>Vendedor</strong>

   - Terá acesso apenas ao fluxo do vendedor.
   - Pode ver todas as suas vendas realizadas.
   - Pode ver os detalhes de uma venda, onde consegue atualizar o status dos pedidos para "Preparando" e "Em Trânsito".
  
  <strong>Administrador</strong>
  
   - Terá acesso apenas ao fluxo do administrador.
   - Consegue ver todos os cadastros do sistema.
   - Pode criar novos usuários (incluindo vendedores e administradores), sem precisar de ativação via email.
   - Pode apagar o cadastro de qualquer pessoa.
  
  <strong>Aplicação em geral</strong>
  
   - Mensagens de erros customizadas na hora do cadastro para ajudar o cliente no preenchimento do formulário.
   - Rotas protegidas no Front-end.
   - Requisições para API protegidas, como por exemplo, apenas um usuário administrador pode apagar um cadastro.
   - Geração de token para manter o usuário logado e fazer requisições seguras, sem manipulação de dados. 
   - Algumas informações são salvas no localStorage, como o carrinho na tela /customer/products, com o propósito de manter os produtos no carrinho caso o cliente saia da página.
</details>

<details>
  <summary>
    <strong>🌐 Acessar o projeto online</strong>
  </summary><br>

  [Link](https://delivery-app-deploy.vercel.app/)
  
  <strong>Colocando a aplicação em 360x640</strong>
  
    1) Abra o link
    2) Aperte F12
    3) Aperte Ctrl + Shift + M
    4) coloque em 360x640
</details>

<details>
  <summary>
    <strong>💻 Como clonar e rodar o projeto na máquina</strong>
  </summary><br>
  
  Desenvolvido com:
  
    - node v16.17.1
    - docker v20.10.18
    - docker-compose v2.5.0
    - npm v8.15.0
  
  1- Clone o repositório: 
  
  <code>git clone git@github.com:FelipeBarbozaa/Delivery-App.git</code>
  
  2- Entre na pasta Delivery-app
  
  3- Instale as dependências do front:
  
  <code>npm run prestart:front </code>
  
  4- Instale as dependências do back:
  
  <code>npm run prestart:back </code>
  
  5- Rode os containers docker:
  
  <code>npm run compose:up</code>
  
  6- Rode as seeds para gerar o banco de dados
  
  <code>npm run db:reset</code>

</details>
