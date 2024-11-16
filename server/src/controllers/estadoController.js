const connection = require("../models/db");

module.exports.getEstado = (req, res) => {
  const consult = `SELECT * FROM ESTADO`;

  try {
    connection.query(consult, (err, results) => {
      if (err) {
        res.status(500).json(err);
      }

      res.status(200).json(results);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.createEstado = (req, res) => {
  const { nombre_estado, detalle_estado } = req.body;

  const query = `
    INSERT INTO ESTADO (nombre_estado, detalle_estado)
    VALUES (?, ?)
  `;

  try {
    connection.query(query, [nombre_estado, detalle_estado], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Estado creado con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear el estado" });
  }
};

module.exports.updateEstado = (req, res) => {
  const { id_estado } = req.params;
  const { nombre_estado, detalle_estado } = req.body;

  const query = `
    UPDATE ESTADO
    SET nombre_estado = ?, detalle_estado = ?
    WHERE id_estado = ?
  `;

  try {
    connection.query(query, [nombre_estado, detalle_estado, id_estado], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }
      res.status(200).json({ message: "Estado actualizado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el estado" });
  }
};

module.exports.deleteEstado = (req, res) => {
  const { id_estado } = req.params;

  const query = `
    DELETE FROM ESTADO
    WHERE id_estado = ?
  `;

  try {
    connection.query(query, [id_estado], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }
      res.status(200).json({ message: "Estado eliminado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar el estado" });
  }
};
