const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

exports.createProduct = async (req, res) => {
  try {
    const { nome_produto, descricao, preco, categoria, quantidade } = req.body;
    
    if (!nome_produto || !preco) {
      return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
    }
    
    const productId = await Product.create(nome_produto, descricao, preco, categoria);
    
    await Inventory.create(productId, quantidade || 0);
    
    const newProduct = await Product.findById(productId);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nome_produto, descricao, preco, categoria } = req.body;
    const affectedRows = await Product.update(req.params.id, nome_produto, descricao, preco, categoria);
    
    if (affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    
    const updatedProduct = await Product.findById(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const affectedRows = await Product.delete(req.params.id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    
    res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};