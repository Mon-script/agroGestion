const bcrypt = require('bcrypt');
const connection = require('../models/db'); // Asegúrate de que esta conexión esté correctamente configurada
const jwt = require('jsonwebtoken');

const saltRounds = 10; // Número de rondas para el hashing con bcrypt

module.exports.registrarUsuario = async (req, res) => {
    const { nombre, apellido, rol, contraseña, usuario, fecha_inicio } = req.body;

    // Hashear la contraseña antes de almacenarla
    try {
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        // Consulta para insertar el usuario
        const consult = 'INSERT INTO USUARIO (usuario, nombre, apellido, contrasena, rol, fecha_inicio, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';

        connection.query(consult, [usuario, nombre, apellido, hashedPassword,rol,fecha_inicio,1], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al registrar el usuario');
            }

            // Enviar respuesta de éxito
            res.status(200).send('Usuario registrado exitosamente');
        });
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
};

module.exports.getUsuarios =(req,res)=>{
    const consult = 'SELECT * FROM USUARIO ';
    try{
        connection.query(consult,(err,result)=>{
            if(err){
                console.error(err)
                res.status(500).send(err);
            }else{
                res.status(200).send(result);
            }
            

        })
    }catch (error) {
        console.error(error);
        res.send(error);
    }


}

module.exports.deleteUsuario = (req, res) => {
    const consult = `UPDATE USUARIO
                    SET activo = 0
                    WHERE id = (?);`;
    try {
        connection.query(consult, [req.params.id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else if (result.affectedRows > 0) {
                res.status(200).send('Usuario deshabilitado');
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la solicitud');
    }
};

module.exports.reintegroUsuario = (req, res) => {
    const consult = `UPDATE USUARIO
                    SET activo = 1
                    WHERE id = (?);`;
    try {
        connection.query(consult, [req.params.id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else if (result.affectedRows > 0) {
                res.status(200).send('Usuario habilitado');
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la solicitud');
    }
};

/*const bcrypt = require('bcrypt');
const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const consult = 'SELECT * FROM USUARIO WHERE usuario = ?';

    try {
        connection.query(consult, [username], async (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                const user = result[0];

                // Comparar la contraseña ingresada con la hasheada
                const passwordMatch = await bcrypt.compare(password, user.contrasena);

                if (passwordMatch) {
                    const role = user.rol;

                    // Firmar el token JWT
                    const token = jwt.sign({ username, role }, "Stack", {
                        expiresIn: '3m'
                    });

                    res.send({ token });
                } else {
                    res.status(401).send({ message: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al procesar la solicitud');
    }
};
*/ 