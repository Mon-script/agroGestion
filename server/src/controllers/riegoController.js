const connection = require("../models/db");

module.exports.getRiego = (req, res) => {
  const consult = `SELECT * FROM RIEGO`;

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

module.exports.createRiego = (req, res) => {
  const { nombre_riego, detalle_riego } = req.body;

  const query = `
    INSERT INTO RIEGO (nombre_riego, detalle_riego)
    VALUES (?, ?)
  `;

  try {
    connection.query(query, [nombre_riego, detalle_riego], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Riego creado con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear el riego" });
  }
};

module.exports.updateRiego = (req, res) => {
  const { id_riego } = req.params;
  const { nombre_riego, detalle_riego } = req.body;

  const query = `
    UPDATE RIEGO
    SET nombre_riego = ?, detalle_riego = ?
    WHERE id_riego = ?
  `;

  try {
    connection.query(query, [nombre_riego, detalle_riego, id_riego], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Riego no encontrado" });
      }
      res.status(200).json({ message: "Riego actualizado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el riego" });
  }
};

module.exports.deleteRiego = (req, res) => {
  const { id_riego } = req.params;

  const query = `
    DELETE FROM RIEGO
    WHERE id_riego = ?
  `;

  try {
    connection.query(query, [id_riego], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Riego no encontrado" });
      }
      res.status(200).json({ message: "Riego eliminado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar el riego" });
  }
};
