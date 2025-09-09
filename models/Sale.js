const db = require('../config/database');

class Sale {
  static async create(id_cliente, valor_total) {
    const [result] = await db.promise().execute(
      'INSERT INTO vendas (id_cliente, valor_total) VALUES (?, ?)',
      [id_cliente, valor_total]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.promise().execute(`
      SELECT v.*, c.nome_cliente 
      FROM vendas v 
      JOIN clientes c ON v.id_cliente = c.id_cliente
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.promise().execute(`
      SELECT v.*, c.nome_cliente 
      FROM vendas v 
      JOIN clientes c ON v.id_cliente = c.id_cliente 
      WHERE v.id_venda = ?
    `, [id]);
    return rows[0];
  }
}

module.exports = Sale;