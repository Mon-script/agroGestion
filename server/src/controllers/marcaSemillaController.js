const connection = require("../models/db");

module.exports.getMarcaSemillas = (req, res) => {
  const consult = `SELECT * FROM MARCA_SEMILLA`;

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

module.exports.createMarcaSemilla = (req, res) => {
  const { nombre_marca, detalle, activo } = req.body;

  const query = `
    INSERT INTO MARCA_SEMILLA (nombre_marca, detalle, activo)
    VALUES (?, ?, ?)
  `;

  try {
    connection.query(query, [nombre_marca, detalle, 1], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Marca de semilla creada con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear la marca de semilla" });
  }
};

module.exports.updateMarcaSemilla = (req, res) => {
  const { id_marca_semilla } = req.params;
  const { nombre_marca, detalle, activo } = req.body;

  const query = `
    UPDATE MARCA_SEMILLA
    SET nombre_marca = ?, detalle = ?, activo = ?
    WHERE id_marca_semilla = ?
  `;

  try {
    connection.query(query, [nombre_marca, detalle, activo, id_marca_semilla], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Marca de semilla no encontrada" });
      }
      res.status(200).json({ message: "Marca de semilla actualizada con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar la marca de semilla" });
  }
};

module.exports.deleteMarcaSemilla = (req, res) => {
  const { id_marca_semilla } = req.params;

  const query = `
    DELETE FROM MARCA_SEMILLA
    WHERE id_marca_semilla = ?
  `;

  try {
    connection.query(query, [id_marca_semilla], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Marca de semilla no encontrada" });
      }
      res.status(200).json({ message: "Marca de semilla eliminada con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar la marca de semilla" });
  }
};
