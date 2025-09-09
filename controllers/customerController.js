const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const { nome_cliente, email, endereco } = req.body;
    
    if (!nome_cliente || !email) {
      return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }
    
    const customerId = await Customer.create(nome_cliente, email, endereco);
    const newCustomer = await Customer.findById(customerId);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { nome_cliente, email, endereco } = req.body;
    const affectedRows = await Customer.update(req.params.id, nome_cliente, email, endereco);
    
    if (affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    const updatedCustomer = await Customer.findById(req.params.id);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const affectedRows = await Customer.delete(req.params.id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    res.status(200).json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};