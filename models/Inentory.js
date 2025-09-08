const db = require('../config/database');

class Order {
  static async create(id_venda, id_produto, quantidade, preco_unitario) {
    const [result] = await db.promise().execute(
      'INSERT INTO pedidos (id_venda, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
      [id_venda, id_produto, quantidade, preco_unitario]
    );
    return result.insertId;
  }

  static async findBySaleId(id_venda) {
    const [rows] = await db.promise().execute(`
      SELECT p.*, prod.nome_produto 
      FROM pedidos p 
      JOIN produtos prod ON p.id_produto = prod.id_produto 
      WHERE p.id_venda = ?
    `, [id_venda]);
    return rows;
  }
}

module.exports = Order;