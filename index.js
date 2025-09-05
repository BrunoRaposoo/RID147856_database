const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.post("/produtos", (req, res) => {
  res.status(200).json({
    data: "cadastrar produtos"
  });
});

app.get("/produtos", (req, res) => {
  res.status(200).json({
    data: 'lista de produtos'
  })
});

app.get("/produtos/:id", (req, res) => {
  res.status(200).json({
    data: 'produto específico'
  })
});

app.put("/produtos/:id", (req, res) => {
  res.status(200).json({
    data: 'atualizar produto específico'
  })
});

app.delete("/produtos/:id", (req, res) => {
  res.status(200).json({
    data: 'produto deletado',
    message: 'Produto deletado com sucesso'
  })
});

app.post("/clientes", (req, res) => {
  res.status(200).json({
    data: 'Cadastrar clientes'
  })
});

app.get("/clientes", (req, res) => {
  res.status(200).json({
    data: 'lista de clientes'
  })
});

app.get("/clientes/:id", (req, res) => {
  res.status(200).json({
    data: 'cliente específico'
  })
});

app.put("/clientes/:id", (req, res) => {
  res.status(200).json({
    data: 'atualizar cliente'
  })
});

app.delete("/clientes/:id", (req, res) => {
  res.status(200).json({
    data: 'Deletar cliente',
    message: 'Cliente deletado com sucesso'
  })
});

app.post("/vendas", (req, res) => {
  res.status(200).json({
    data: 'Venda criada'
  })
});

app.get("/vendas", (req, res) => {
  res.status(200).json({
    data: 'vendas'
  })
});

app.get("/vendas/:id", (req, res) => {
  res.status(200).json({
    data: 'venda específica'
  })
});

app.get("/estoque", (req, res) => {
  res.status(200).json({
    data: 'estoque'
  })
});

app.put("/estoque/:id_produto", (req, res) => {
  res.status(200).json({
    data: 'estoque de produto específico'
  })
});

app.get("/", (req, res) => {
  res.json({
    mensagem: "API DNCommerce funcionando!",
    endpoints: {
      produtos: "/produtos",
      clientes: "/clientes",
      vendas: "/vendas",
      estoque: "/estoque",
    },
  });
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
