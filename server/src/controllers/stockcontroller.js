const connection = require("../models/db");

module.exports.getStock = (req, res) => {
  const consult = `SELECT 
    E.id AS entrada_id,
    P.id_codigo_barra,
    P.nombre AS producto_nombre,
    P.calidad,
    E.estante AS estante,
    E.fecha AS fecha,
    E.hora AS hora
FROM 
    ENTRADA E
JOIN 
    PRODUCTO P ON E.id_codigo_barrafk = P.id_codigo_barra`;
  try {
    connection.query(consult, (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        console.log(result);
        res.json(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports.postEntrada = (req, res) => {
    const{codigo,estante,fecha,hora}=req.body
    const consult = `INSERT INTO ENTRADA 
    (id_codigo_barrafk, estante, fecha, hora) 
    VALUES (?,?,?,?)`;
    try {
      connection.query(consult,[codigo, estante, fecha, hora], (err, result) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          console.log(result);
          res.json(result);
        }
      });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  };
/*
(id_codigo_barrafk, estante, fecha, hora)entrada

SELECT 
    E.id AS entrada_id,
    P.id_codigo_barra,
    P.nombre AS producto_nombre,
    P.calidad,
    E.fecha,
    E.hora
FROM 
    ENTRADA E
JOIN 
    PRODUCTO P ON E.id_codigo_barrafk = P.id_codigo_barra;*/
