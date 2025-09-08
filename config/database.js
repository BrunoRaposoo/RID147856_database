const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bruno',
  password: 'liamfl',
  database: 'dncommerce',
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0
})

connection.connect((error) => {
  if (error) {
    console.log('Erro ao conectar ao mysql', error);
    return;
  }

  console.log('Conectado ao mysql');
})

module.exports = connection;