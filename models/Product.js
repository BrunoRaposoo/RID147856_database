const db = require('../config/database');

class Product {
  static async create(nome_produto, descricao, preco, categoria) {
    const [result] = await db.promise().execute(
      'INSERT INTO produtos (nome_produto, descricao, preco, categoria) VALUES (?, ?, ?, ?)',
      [nome_produto, descricao, preco, categoria]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.promise().execute('SELECT * FROM produtos');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.promise().execute('SELECT * FROM produtos WHERE id_produto = ?', [id]);
    return rows[0];
  }

  static async update(id, nome_produto, descricao, preco, categoria) {
    const [result] = await db.promise().execute(
      'UPDATE produtos SET nome_produto = ?, descricao = ?, preco = ?, categoria = ? WHERE id_produto = ?',
      [nome_produto, descricao, preco, categoria, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.promise().execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Product;