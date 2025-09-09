const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { quantidade } = req.body;
    
    if (typeof quantidade !== 'number') {
      return res.status(400).json({ erro: 'Quantidade é obrigatória e deve ser um número' });
    }
    
    const affectedRows = await Inventory.update(req.params.id_produto, quantidade);
    
    if (affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado no estoque' });
    }
    
    const updatedInventory = await Inventory.findByProductId(req.params.id_produto);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};