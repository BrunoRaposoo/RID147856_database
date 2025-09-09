const db = require('../config/database');

class Customer {
  static async create(nome_cliente, email, endereco) {
    const [result] = await db.promise().execute(
      'INSERT INTO clientes (nome_cliente, email, endereco) VALUES (?, ?, ?)',
      [nome_cliente, email, endereco]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.promise().execute('SELECT * FROM clientes');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.promise().execute('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
    return rows[0];
  }

  static async update(id, nome_cliente, email, endereco) {
    const [result] = await db.promise().execute(
      'UPDATE clientes SET nome_cliente = ?, email = ?, endereco = ? WHERE id_cliente = ?',
      [nome_cliente, email, endereco, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.promise().execute('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Customer;