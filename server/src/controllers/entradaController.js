const connection = require("../models/db");

module.exports.getEntrada = (req, res) => {
  //const consult = 'SELECT * FROM SALIDA';
  const consult = `SELECT 
    E.id AS entrada_id,
    P.id_codigo_barra,
    P.nombre AS producto_nombre,
    P.calidad,
    E.estante,
    E.fecha,
    E.hora
FROM 
    ENTRADA E
JOIN 
    PRODUCTO P ON E.id_codigo_barrafk = P.id_codigo_barra`

  try {
    connection.query(consult, (err, results) => {
      console.log(results);
      res.json(results);
    });
  } catch (e) {
    console.log(e);
  }
};