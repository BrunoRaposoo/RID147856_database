const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.post("/products", (req, res) => {
  res.status(200).json({
    data: "cadastrar produtos"
  });
});

app.get("/products", (req, res) => {
  res.status(200).json({
    data: 'lista de produtos'
  })
});

app.get("/products/:id", (req, res) => {
  res.status(200).json({
    data: 'produto específico'
  })
});

app.put("/products/:id", (req, res) => {
  res.status(200).json({
    data: 'atualizar produto específico'
  })
});

app.delete("/products/:id", (req, res) => {
  res.status(200).json({
    data: 'produto deletado',
    message: 'Produto deletado com sucesso'
  })
});

app.post("/customers", (req, res) => {
  res.status(200).json({
    data: 'Cadastrar clientes'
  })
});

app.get("/customers", (req, res) => {
  res.status(200).json({
    data: 'lista de clientes'
  })
});

app.get("/customers/:id", (req, res) => {
  res.status(200).json({
    data: 'cliente específico'
  })
});

app.put("/customers/:id", (req, res) => {
  res.status(200).json({
    data: 'atualizar cliente'
  })
});

app.delete("/customers/:id", (req, res) => {
  res.status(200).json({
    data: 'Deletar cliente',
    message: 'Cliente deletado com sucesso'
  })
});

app.post("/sales", (req, res) => {
  res.status(200).json({
    data: 'Venda criada'
  })
});

app.get("/sales", (req, res) => {
  res.status(200).json({
    data: 'vendas'
  })
});

app.get("/sales/:id", (req, res) => {
  res.status(200).json({
    data: 'venda específica'
  })
});

app.get("/inventory", (req, res) => {
  res.status(200).json({
    data: 'estoque'
  })
});

app.put("/inventory/:id_produto", (req, res) => {
  res.status(200).json({
    data: 'estoque de produto específico'
  })
});

app.get("/", (req, res) => {
  res.json({
    mensagem: "API DNCommerce funcionando!",
    endpoints: {
      produtos: "/products",
      clientes: "/customers",
      vendas: "/sales",
      estoque: "/inventory", 
    },
  });
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
