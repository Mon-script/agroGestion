const connection = require("../models/db");

module.exports.getMarcaFerti = (req, res) => {
  const consult = `SELECT * FROM MARCA_FERTILIZANTE;`;

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

module.exports.createMarcaFerti = (req, res) => {
  const { nombre_marca, detalle, activo } = req.body;

  const query = `
    INSERT INTO MARCA_FERTILIZANTE (nombre_marca, detalle, activo)
    VALUES (?, ?, ?)
  `;

  try {
    connection.query(query, [nombre_marca, detalle, 1], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ message: "Marca de fertilizante creada con éxito", id: results.insertId });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear la marca de fertilizante" });
  }
};

module.exports.updateMarcaFerti = (req, res) => {
  const { id_marca_fertilizante } = req.params;
  const { nombre_marca, detalle, activo } = req.body;

  const query = `
    UPDATE MARCA_FERTILIZANTE
    SET nombre_marca = ?, detalle = ?, activo = ?
    WHERE id_marca_fertilizante = ?
  `;

  try {
    connection.query(query, [nombre_marca, detalle, activo, id_marca_fertilizante], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Marca de fertilizante no encontrada" });
      }
      res.status(200).json({ message: "Marca de fertilizante actualizada con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al actualizar la marca de fertilizante" });
  }
};

module.exports.deleteMarcaFerti = (req, res) => {
  const { id_marca_fertilizante } = req.params;

  const query = `
    DELETE FROM MARCA_FERTILIZANTE
    WHERE id_marca_fertilizante = ?
  `;

  try {
    connection.query(query, [id_marca_fertilizante], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Marca de fertilizante no encontrada" });
      }
      res.status(200).json({ message: "Marca de fertilizante eliminada con éxito" });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al eliminar la marca de fertilizante" });
  }
};
