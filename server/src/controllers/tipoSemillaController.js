const connection = require("../models/db");

module.exports.getTipoSemilla = (req, res) => {
  const consult = `SELECT * FROM TIPO_SEMILLA`;

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

module.exports.createTipoSemilla = (req, res) => {
  const { nombre_semilla, detalle_semilla, activo } = req.body;

  const query = `
    INSERT INTO TIPO_SEMILLA (nombre_semilla, detalle_semilla, activo)
    VALUES (?, ?, ?)
  `;

  try {
    connection.query(query, [nombre_semilla, detalle_semilla, 1], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Tipo de semilla creado con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear el tipo de semilla" });
  }
};

module.exports.updateTipoSemilla = (req, res) => {
  const { id_tipo_semilla } = req.params;
  const { nombre_semilla, detalle_semilla, activo } = req.body;

  const query = `
    UPDATE TIPO_SEMILLA
    SET nombre_semilla = ?, detalle_semilla = ?, activo = ?
    WHERE id_tipo_semilla = ?
  `;

  try {
    connection.query(query, [nombre_semilla, detalle_semilla, activo, id_tipo_semilla], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Tipo de semilla no encontrado" });
      }
      res.status(200).json({ message: "Tipo de semilla actualizado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar el tipo de semilla" });
  }
};

module.exports.deleteTipoSemilla = (req, res) => {
  const { id_tipo_semilla } = req.params;

  const query = `
    DELETE FROM TIPO_SEMILLA
    WHERE id_tipo_semilla = ?
  `;

  try {
    connection.query(query, [id_tipo_semilla], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Tipo de semilla no encontrado" });
      }
      res.status(200).json({ message: "Tipo de semilla eliminado con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar el tipo de semilla" });
  }
};
