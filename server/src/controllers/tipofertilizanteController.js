const connection = require("../models/db");

module.exports.getFerti = (req, res) => {
  const consult = `SELECT * FROM FERTILIZANTE`;

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


module.exports.createFerti = (req, res) => {
  const { nombre_fertilizante, detalle_fertilizante, activo } = req.body;

  const query = `
    INSERT INTO FERTILIZANTE (nombre_fertilizante, detalle_fertilizante, activo)
    VALUES (?, ?, ?)
  `;

  try {
    connection.query(query, [nombre_fertilizante, detalle_fertilizante,1], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Fertilizante creado con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear el fertilizante" });
  }
};

module.exports.updateFerti = (req, res) => {
  const { id_fertilizante } = req.params;
  const { nombre_fertilizante, detalle_fertilizante, activo } = req.body;

  const query = `
    UPDATE FERTILIZANTE
    SET nombre_fertilizante = ?, detalle_fertilizante = ?, activo = ?
    WHERE id_fertilizante = ?
  `;

  try {
    connection.query(query, [nombre_fertilizante, detalle_fertilizante, activo, id_fertilizante], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Fertilizante no encontrado" });
      }
      res.status(200).json({ message: "Fertilizante actualizado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el fertilizante" });
  }
};

module.exports.deleteFerti = (req, res) => {
  const { id_fertilizante } = req.params;

  const query = `
    DELETE FROM FERTILIZANTE
    WHERE id_fertilizante = ?
  `;

  try {
    connection.query(query, [id_fertilizante], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Fertilizante no encontrado" });
      }
      res.status(200).json({ message: "Fertilizante eliminado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar el fertilizante" });
  }
};
