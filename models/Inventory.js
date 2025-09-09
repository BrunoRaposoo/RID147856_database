const db = require('../config/database');

class Inventory {
  static async create(id_produto, quantidade) {
    const [result] = await db.promise().execute(
      'INSERT INTO estoque (id_produto, quantidade) VALUES (?, ?)',
      [id_produto, quantidade]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.promise().execute(`
      SELECT e.*, p.nome_produto 
      FROM estoque e 
      JOIN produtos p ON e.id_produto = p.id_produto
    `);
    return rows;
  }

  static async findByProductId(id_produto) {
    const [rows] = await db.promise().execute('SELECT * FROM estoque WHERE id_produto = ?', [id_produto]);
    return rows[0];
  }

  static async update(id_produto, quantidade) {
    const [result] = await db.promise().execute(
      'UPDATE estoque SET quantidade = ? WHERE id_produto = ?',
      [quantidade, id_produto]
    );
    return result.affectedRows;
  }
}

module.exports = Inventory;