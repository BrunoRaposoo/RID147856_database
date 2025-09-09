<h1 align="center"> DNCommerce </h1>
Sistema de back-end para gerenciamento de produtos, clientes, vendas e estoque de uma loja online.

<br>

<p align="center">
  <a href="#-Tecnologias ">Tecnologias </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Instalação e Configuração">Instalação e Configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Estrutura do Banco de Dados">Estrutura do Banco de Dados</a>&nbsp;&nbsp;&nbsp
</p>

<br>

## 🚀 Tecnologias
- Node.js - Ambiente de execução JavaScript

- Express.js - Framework web para Node.js

- MySQL - Sistema de gerenciamento de banco de dados

- Insomnia - Cliente API para testes

## 📋 Instalação e Configuração
- Clone o repositório

git clone <url_do_repositório>

- Instale as dependências

yarn install / npm install

- Configure o banco de dados

Execute o script SQL no MySQL para criar o banco e as tabelas (arquivo: scripts/init-database.sql)

- Configure as variáveis de conexão
Edite o arquivo config/database.js com suas credenciais do MySQL:<br>
const connection = mysql.createConnection({<br>
  host: 'localhost',<br>
  user: 'seu usuário',<br>
  password: 'sua senha',<br>
  database: 'dncommerce',<br>
  waitForConnections: true,<br>
  connectionLimit: 10,<br>
  queueLimit: 0<br>
})

- Execute a aplicação

npm run dev / yarn start

## 🌐 Estrutura do Banco de Dados
- Diagrama de Entidade-Relacionamento

erDiagram<br>
    CLIENTES ||--o{ VENDAS : realiza<br>
    VENDAS ||--o{ PEDIDOS : contém<br>
    PRODUTOS ||--o{ PEDIDOS : incluído_em<br>
    PRODUTOS ||--|| ESTOQUE : possui<br>

    CLIENTES {
        int id_cliente PK
        varchar nome_cliente
        varchar email
        text endereco
    }

    VENDAS {
        int id_venda PK
        datetime data_venda
        int id_cliente FK
        decimal valor_total
    }

    PEDIDOS {
        int id_pedido PK
        int id_venda FK
        int id_produto FK
        int quantidade
        decimal preco_unitario
    }

    PRODUTOS {
        int id_produto PK
        varchar nome_produto
        text descricao
        decimal preco
        varchar categoria
    }

    ESTOQUE {
        int id_estoque PK
        int id_produto FK
        int quantidade
        datetime ultima_atualizacao
    }

## 📡 Endpoints da API
- Produtos<br>

POST /products - Criar um novo produto

GET /products - Listar todos os produtos

GET /products/:id - Obter um produto específico

PUT /products/:id - Atualizar um produto

DELETE /products/:id - Excluir um produto

- Clientes<br>

POST /customers - Criar um novo cliente

GET /customers - Listar todos os clientes

GET /customers/:id - Obter um cliente específico

PUT /customers/:id - Atualizar um cliente

DELETE /customers/:id - Excluir um cliente

- Vendas <br>

POST /sales - Registrar uma nova venda

GET /sales - Listar todas as vendas

GET /sales/:id - Obter uma venda específica

- Estoque <br>

GET /inventory - Consultar o estoque

PUT /inventory/:id_produto - Atualizar o estoque de um produto