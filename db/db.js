const mysql = require("mysql")//Modulo de mysql_client

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lostdesert1989*',
  database: 'pruebasProyectos'
});

module.exports = connection;//Exportamos la conexion


