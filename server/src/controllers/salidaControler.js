const connection = require("../models/db");

module.exports.getSalida = (req, res) => {
  //const consult = 'SELECT * FROM SALIDA';
  const consult = `SELECT 
    S.id AS salida_id,
    P.id_codigo_barra,
    P.nombre AS producto_nombre,
    P.calidad,
    U.id AS empleado_id,
    U.usuario AS empleado_nombre,
    S.fecha,
    S.hora
FROM 
    SALIDA S
JOIN 
    PRODUCTO P ON S.id_codigo_barrafk = P.id_codigo_barra
JOIN 
    USUARIO U ON S.id_empleadofk = U.id`;

  try {
    connection.query(consult, (err, results) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      console.log(results);
      res.json(results);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.postEntredaSalida = (req, res) => {
  const { id_codigo_barra, id_empleado, fecha, hora, id_entrada } = req.body;

  const consulDelete = `DELETE FROM ENTRADA WHERE id = ?`;

  connection.query(consulDelete, [id_entrada], (err, deleteResult) => {
    if (err) {
      console.log('Error al eliminar entrada:', err);
      return res.status(500).json({ error: 'Error al eliminar entrada' });
    }

    const consultaInsert = `INSERT INTO SALIDA (id_codigo_barrafk, id_empleadofk, fecha, hora) VALUES (?, ?, ?, ?)`;

    connection.query(consultaInsert, [id_codigo_barra, id_empleado, fecha, hora], (err, insertResult) => {
      if (err) {
        console.log('Error al insertar salida:', err);
        return res.status(500).json({ error: 'Error al insertar salida' });
      }

      console.log('Inserción exitosa en salida:', insertResult);
      return res.status(200).json({ message: 'Eliminación de entrada y salida registrada exitosamente' });
    });
  });
};


/*
module.exports.postEntredaSalida = (req, res) => {
  const { id_codigo_barra, id_empleado, fecha, hora, id_entrada } = req.body;

  const consulDelete = `DELETE FROM ENTRADA WHERE id = ?`;

  connection.query(consulDelete, [id_entrada], (err, deleteResult) => {
    if (err) {
      console.log('Error al eliminar entrada:', err);
      return res.status(500).json({ error: 'Error al eliminar entrada' });
    }

    const consultaInsert = `INSERT INTO SALIDA (id_codigo_barrafk, id_empleadofk, fecha, hora) VALUES (?, ?, ?, ?)`;

    connection.query(consultaInsert, [id_codigo_barra, id_empleado, fecha, hora], (err, insertResult) => {
      if (err) {
        console.log('Error al insertar salida:', err);
        return res.status(500).json({ error: 'Error al insertar salida' });
      }

      console.log('Inserción exitosa en salida:', insertResult);
      return res.status(200).json({ message: 'Eliminación de entrada y salida registrada exitosamente' });
    });
  });
};

*/
