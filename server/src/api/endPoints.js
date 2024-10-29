const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController')
const {getSalida, postEntredaSalida}= require('../controllers/salidaControler')
const {saveProduct}=require('../controllers/productoController')
const {getProducts, getPorductosId}=require('../controllers/productoController')
const {deleteProducts}=require('../controllers/productoController')
const {getStock}=require('../controllers/stockcontroller')
const {postEntrada}=require('../controllers/stockcontroller')
const {registrarUsuario, getUsuarios, deleteUsuario, reintegroUsuario}= require('../controllers/userController')
const multer=require('multer')
const path = require('path');
const { getEntrada } = require('../controllers/entradaController');

const almacenamientoTemporal= multer.diskStorage({
    destination: path.join(__dirname,'../imagenes'),//dirnaame es una variable global
    // que donde es ejecutada(con js) devuelve la ruta
    // donde esta/el metodo join une en una ruta sus argumentos.
    filename: (req,avatar,callBack)=>{{
        callBack(null,Date.now()+'-reprise-'+ avatar.originalname)
    }}
})

const avatarSubir = multer({
    storage: almacenamientoTemporal,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 3 // 3GB límite de tamaño de archivo
    }
}).single('avatar');




router.get('/ping', ping);
router.get('/salida',getSalida);
router.get('/entrada',getEntrada);
router.get('/productos/get',getProducts);
router.get('/productos/get/id',getPorductosId);
router.get('/stock/get',getStock);
router.get('/getUsuarios',getUsuarios);

router.post('/login', login);
router.post('/registroUser', registrarUsuario);
router.post('/saveProduct',avatarSubir, saveProduct);
router.post('/post/entrada', postEntrada);
router.post('/postEntredaSalida', postEntredaSalida)

router.put('/reintegrarUsuario/:id', reintegroUsuario)

router.delete('/producto/delete/:id/:nombree/:marcaa',deleteProducts);
router.delete('/deleteUsuario/:id', deleteUsuario)


module.exports = router;