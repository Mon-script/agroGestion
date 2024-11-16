const connection = require("../models/db");

module.exports.getEmpaque = (req, res) => {
  const consult = `SELECT * FROM EMPAQUE`;

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

module.exports.createEmpaque = (req, res) => {
  const { nombre_empaque, detalle_empaque } = req.body;

  const query = `
    INSERT INTO EMPAQUE (nombre_empaque, detalle_empaque)
    VALUES (?, ?)
  `;

  try {
    connection.query(query, [nombre_empaque, detalle_empaque], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Empaque creado con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear el empaque" });
  }
};

module.exports.updateEmpaque = (req, res) => {
  const { id_empaque } = req.params;
  const { nombre_empaque, detalle_empaque } = req.body;

  const query = `
    UPDATE EMPAQUE
    SET nombre_empaque = ?, detalle_empaque = ?
    WHERE id_empaque = ?
  `;

  try {
    connection.query(query, [nombre_empaque, detalle_empaque, id_empaque], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Empaque no encontrado" });
      }
      res.status(200).json({ message: "Empaque actualizado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el empaque" });
  }
};

module.exports.deleteEmpaque = (req, res) => {
  const { id_empaque } = req.params;

  const query = `
    DELETE FROM EMPAQUE
    WHERE id_empaque = ?
  `;

  try {
    connection.query(query, [id_empaque], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Empaque no encontrado" });
      }
      res.status(200).json({ message: "Empaque eliminado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar el empaque" });
  }
};
