const Sale = require('../models/Sale');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

exports.createSale = async (req, res) => {
  try {
    const { id_cliente, produtos } = req.body;
    
    if (!id_cliente || !produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ erro: 'ID do cliente e lista de produtos são obrigatórios' });
    }
    
    let valor_total = 0;
    const itens_pedido = [];
    
    for (const item of produtos) {
      const produto = await Product.findById(item.id_produto);
      
      if (!produto) {
        return res.status(404).json({ erro: `Produto com ID ${item.id_produto} não encontrado` });
      }
      
      const estoqueItem = await Inventory.findByProductId(item.id_produto);
      if (!estoqueItem || estoqueItem.quantidade < item.quantidade) {
        return res.status(400).json({ erro: `Estoque insuficiente para o produto ${produto.nome_produto}` });
      }
      
      const valor_item = produto.preco * item.quantidade;
      valor_total += valor_item;
      
      itens_pedido.push({
        id_produto: item.id_produto,
        quantidade: item.quantidade,
        preco_unitario: produto.preco,
        valor_total_item: valor_item
      });
    }
    
    const saleId = await Sale.create(id_cliente, valor_total);
    
    for (const item of itens_pedido) {
      await Order.create(saleId, item.id_produto, item.quantidade, item.preco_unitario);
      
      const estoqueItem = await Inventory.findByProductId(item.id_produto);
      await Inventory.update(item.id_produto, estoqueItem.quantidade - item.quantidade);
    }
    
    const newSale = await Sale.findById(saleId);
    newSale.itens = await Order.findBySaleId(saleId);
    
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    
    if (!sale) {
      return res.status(404).json({ erro: 'Venda não encontrada' });
    }
    
    sale.itens = await Order.findBySaleId(req.params.id);
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};