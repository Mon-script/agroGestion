const bcrypt = require('bcrypt');
const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    // Consulta que verifica si el usuario existe y está activo
    const consult = 'SELECT * FROM USUARIO WHERE usuario = ? AND activo = 1';

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
                    const id = user.id;

                    // Firmar el token JWT
                    const token = jwt.sign({ username, role, id }, "Stack", {
                        expiresIn: '20m' // El token expira en 3 minutos
                    });

                    res.send({ token });
                } else {
                    res.status(401).send({ message: 'Contraseña incorrecta' });
                }
            } else {
                // Si no hay resultados, el usuario no existe o no está activo
                res.status(404).send({ message: 'Usuario no encontrado o no está activo' });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al procesar la solicitud');
    }
};

/*

nuevo log---------------------------------------------------------------
const bcrypt = require('bcrypt');
const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    // Consulta que verifica si el usuario existe y está activo
    const consult = 'SELECT * FROM USUARIO WHERE usuario = ? AND activo = 1';

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
                        expiresIn: '3m' // El token expira en 3 minutos
                    });

                    res.send({ token });
                } else {
                    res.status(401).send({ message: 'Contraseña incorrecta' });
                }
            } else {
                // Si no hay resultados, el usuario no existe o no está activo
                res.status(404).send({ message: 'Usuario no encontrado o no está activo' });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error al procesar la solicitud');
    }
};


-------------------------------------------------------------------------
const bcrypt = require('bcrypt');
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
-------------------------------------------------------------------------
const connection = require('../models/db')
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) =>{
    const {username, password} = req.body;
    const consult = 'SELECT * FROM USUARIO WHERE usuario = ? AND contrasena = ?';

    try {
      connection.query(consult, [username, password], (err, result)=>{
          if(err){
              res.status(500).send(err);
              
          }

          if(result.length > 0){
            console.log(result)
            let user= result[0]
            const role = user.rol
            //console.log(username,role)
            
            
              const token = jwt.sign({username,role}, "Stack", {
                  expiresIn: '3m'
              });
              res.send({token});
          } else {
              console.log('wrong user')
              res.send({message: 'wrong user'})
          }
      })
    } catch (e) {
        console.error(e)

    }

}
*/ 