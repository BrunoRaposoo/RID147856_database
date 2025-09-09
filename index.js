const express = require("express");
const app = express();
const port = 8080;

const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const saleRoutes = require('./routes/saleRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/sales', saleRoutes);
app.use('/inventory', inventoryRoutes);

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
