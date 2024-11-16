const connection = require("../models/db");

module.exports.getCosecha = (req, res) => {
  const consult = `SELECT 
    C.id_cosecha,
    C.id_siembra,
    C.id_codigo_barrafk,
    P.nombre AS nombre_producto, 
    C.rendimiento_cosecha,
    C.cantidad_cosecha,
    C.id_empaquefk,
    E.nombre_empaque,  
    C.fecha_cosecha
FROM 
    COSECHA C
INNER JOIN 
    EMPAQUE E ON C.id_empaquefk = E.id_empaque
INNER JOIN 
    SIEMBRA S ON C.id_siembra = S.id_siembra
INNER JOIN 
    PRODUCTO P ON C.id_codigo_barrafk = P.id_codigo_barra`;

  try {
    connection.query(consult, (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports.registrarCosecha = (req, res) => {
  const {
        id_siembra,
        producto,
        rendimientoCosecha,
        cantidadCosecha,
        empaque,
        fechaCosecha,
  } = req.body;

  // Validar que los campos obligatorios no estén vacíos antes de realizar cualquier operación
  if (
    !id_siembra ||
    !producto ||
    !rendimientoCosecha ||
    !cantidadCosecha ||
    !empaque||
    !fechaCosecha
  ) {
    return res
      .status(400)
      .send("Todos los campos requeridos deben estar completos");
  }

  // Consulta para desactivar la siembra
  const consultUpdate = `UPDATE SIEMBRA SET activo = false WHERE id_siembra = ?`;

  connection.query(consultUpdate, [id_siembra], (err, updateResult) => {
    if (err) {
      console.error("Error al desactivar la siembra:", err);
      return res.status(500).json({ error: "Error al desactivar la siembra" });
    }

    console.log("Siembra desactivada exitosamente:", updateResult);

    // Consulta para insertar una nueva cosecha después de desactivar la siembra
    const consultInsert = `
      INSERT INTO COSECHA (
        id_siembra, 
        id_codigo_barrafk, 
        rendimiento_cosecha, 
        cantidad_cosecha, 
        id_empaquefk, 
        fecha_cosecha
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      consultInsert,
      [
        id_siembra,
        producto,
        rendimientoCosecha,
        cantidadCosecha,
        empaque,
        fechaCosecha,
      ],
      (err, insertResult) => {
        if (err) {
          console.error("Error al registrar la cosecha:", err);
          return res.status(500).json({ error: "Error al registrar la cosecha" });
        }

        console.log("Cosecha registrada exitosamente:", insertResult);
        res.status(200).json({ message: "Cosecha registrada exitosamente" });
      }
    );
  });
};


/*
module.exports.registrarCosecha = async (req, res) => {
  const {
    id_siembra,
    id_codigo_barrafk,
    rendimiento_cosecha,
    cantidad_cosecha,
    id_empaquefk,
    fecha_cosecha,
  } = req.body;

  const consult = `UPDATE SIEMBRA SET activo = false WHERE id_siembra = ?`;

  try {
    connection.query(consult, [id_siembra], (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        console.log(result);
        res.json({
          message: "Registro desactivado exitosamente",
          result,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }

  // Validar que los campos obligatorios no estén vacíos
  if (
    !id_siembra ||
    !id_codigo_barrafk ||
    !rendimiento_cosecha ||
    !cantidad_cosecha ||
    !id_empaquefk
  ) {
    return res
      .status(400)
      .send("Todos los campos requeridos deben estar completos");
  }

  try {
    // Consulta para insertar una nueva cosecha
    const consult = `
            INSERT INTO COSECHA (
                id_siembra, 
                id_codigo_barrafk, 
                rendimiento_cosecha, 
                cantidad_cosecha, 
                id_empaquefk, 
                fecha_cosecha
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;

    // Ejecutar la consulta con los datos recibidos
    connection.query(
      consult,
      [
        id_siembra,
        id_codigo_barrafk,
        rendimiento_cosecha,
        cantidad_cosecha,
        id_empaquefk,
        fecha_cosecha,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al registrar la cosecha:", err);
          return res.status(500).send("Error al registrar la cosecha");
        }

        // Respuesta exitosa
        res.status(200).send("Cosecha registrada exitosamente");
      }
    );
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

*/ 