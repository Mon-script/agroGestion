const connection = require("../models/db");

module.exports.getSiembra = (req, res) => {
  const consult = `SELECT 
    si.id_siembra,
    si.id_codigo_barrafk,
    p.nombre AS nombre_producto,
    si.id_tipo_semillafk,
    ts.nombre_semilla AS nombre_tipo_semilla,
    si.id_marca_semillafk,
    ms.nombre_marca AS nombre_marca_semilla,
    si.cantidad,
    si.id_tipo_fertilizantefk,
    f.nombre_fertilizante AS nombre_fertilizante,
    si.id_marca_fertilizantefk,
    mf.nombre_marca AS nombre_marca_fertilizante,
    si.id_estado,
    e.nombre_estado AS estado,
    si.fecha_estado,
    si.id_riegofk,
    r.nombre_riego AS nombre_riego,
    si.fecha_riego,
    si.fecha_siembra,
    si.volumen_siembra,
    si.estimacion_cosecha,
    si.activo
FROM 
    SIEMBRA si
INNER JOIN PRODUCTO p ON si.id_codigo_barrafk = p.id_codigo_barra
INNER JOIN TIPO_SEMILLA ts ON si.id_tipo_semillafk = ts.id_tipo_semilla
INNER JOIN MARCA_SEMILLA ms ON si.id_marca_semillafk = ms.id_marca_semilla
INNER JOIN FERTILIZANTE f ON si.id_tipo_fertilizantefk = f.id_fertilizante
INNER JOIN MARCA_FERTILIZANTE mf ON si.id_marca_fertilizantefk = mf.id_marca_fertilizante
INNER JOIN ESTADO e ON si.id_estado = e.id_estado
INNER JOIN RIEGO r ON si.id_riegofk = r.id_riego`;
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

module.exports.getSiembraActivas = (req, res) => {
  const consult = `SELECT 
    si.id_siembra,
    si.id_codigo_barrafk,
    p.nombre AS nombre_producto,
    si.id_tipo_semillafk,
    ts.nombre_semilla AS nombre_tipo_semilla,
    si.id_marca_semillafk,
    ms.nombre_marca AS nombre_marca_semilla,
    si.cantidad,
    si.id_tipo_fertilizantefk,
    f.nombre_fertilizante AS nombre_fertilizante,
    si.id_marca_fertilizantefk,
    mf.nombre_marca AS nombre_marca_fertilizante,
    si.id_estado,
    e.nombre_estado AS estado,
    si.fecha_estado,
    si.id_riegofk,
    r.nombre_riego AS nombre_riego,
    si.fecha_riego,
    si.fecha_siembra,
    si.volumen_siembra,
    si.estimacion_cosecha,
    si.activo
FROM 
    SIEMBRA si
INNER JOIN PRODUCTO p ON si.id_codigo_barrafk = p.id_codigo_barra
INNER JOIN TIPO_SEMILLA ts ON si.id_tipo_semillafk = ts.id_tipo_semilla
INNER JOIN MARCA_SEMILLA ms ON si.id_marca_semillafk = ms.id_marca_semilla
INNER JOIN FERTILIZANTE f ON si.id_tipo_fertilizantefk = f.id_fertilizante
INNER JOIN MARCA_FERTILIZANTE mf ON si.id_marca_fertilizantefk = mf.id_marca_fertilizante
INNER JOIN ESTADO e ON si.id_estado = e.id_estado
INNER JOIN RIEGO r ON si.id_riegofk = r.id_riego
  WHERE si.activo = true`;

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

module.exports.postSiembra = (req, res) => {
  console.log("Datos recibidos:", req.body); // Asegúrate de que esta línea aparezca en la consola

  const {
    producto,
    tipoSemilla,
    marcaSemilla,
    cantidad,
    fertilizante,
    marcaFertilizante,
    estado,
    riego,
    fechaSiembra,
    fechaEstado,
    fechaRiego,
    volumenSiembra,
    estimacionCosechaFecha,
  } = req.body;
  if (
    producto == null ||
    tipoSemilla == null ||
    marcaSemilla == null ||
    cantidad == null ||
    fertilizante == null ||
    marcaFertilizante == null ||
    estado == null ||
    fechaEstado == null ||
    riego == null ||
    fechaRiego == null ||
    fechaSiembra == null ||
    volumenSiembra == null ||
    estimacionCosechaFecha == null
  ) {
    console.log("Todos los campos son requeridos");
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const consult = `INSERT INTO SIEMBRA 
    (
      id_codigo_barrafk,
      id_tipo_semillafk,
      id_marca_semillafk,
      cantidad,
      id_tipo_fertilizantefk,
      id_marca_fertilizantefk,
      id_estado,
      fecha_estado,
      id_riegofk,
      fecha_riego,
      fecha_siembra,
      volumen_siembra,
      estimacion_cosecha,
      activo
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    connection.query(
      consult,
      [
        producto,
        tipoSemilla,
        marcaSemilla,
        cantidad,
        fertilizante,
        marcaFertilizante,
        estado,
        fechaEstado,
        riego,
        fechaRiego,
        fechaSiembra,
        volumenSiembra,
        estimacionCosechaFecha,
        1,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
         return res.status(200).send("Siembra guardada con exito");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports.putSiembra = (req, res) => {
  

  const {
    producto,
    tipoSemilla,
    marcaSemilla,
    cantidad,
    fertilizante,
    marcaFertilizante,
    estado,
    fechaEstado,
    riego,
    fechaRiego,
    fechaSiembra,
    volumenSiembra,
    estimacionCosechaFecha,
    id_siembra
  } = req.body;

  const consult = `UPDATE SIEMBRA SET 
    id_codigo_barrafk = ?,
    id_tipo_semillafk = ?,
    id_marca_semillafk = ?,
    cantidad = ?,
    id_tipo_fertilizantefk = ?,
    id_marca_fertilizantefk = ?,
    id_estado = ?,
    fecha_estado = ?,
    id_riegofk = ?,
    fecha_riego = ?,
    fecha_siembra = ?,
    volumen_siembra = ?,
    estimacion_cosecha = ?,
    activo = ?
  WHERE id_siembra = ?`;

  try {
    connection.query(
      consult,
      [
        producto,
        tipoSemilla,
        marcaSemilla,
        cantidad,
        fertilizante,
        marcaFertilizante,
        estado,
        fechaEstado,
        riego,
        fechaRiego,
        fechaSiembra,
        volumenSiembra,
        estimacionCosechaFecha,
        1,
        id_siembra,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          console.log(result);
          res.json(result);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports.deleteSiembra = (req, res) => {
  const { id_siembra } = req.params;

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
};
