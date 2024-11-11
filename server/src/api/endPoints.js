const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController')
const {getSalida, postEntredaSalida}= require('../controllers/salidaControler')
const {saveProduct, getProductsSelect}=require('../controllers/productoController')
const {getProducts, getPorductosId}=require('../controllers/productoController')
const {deleteProducts}=require('../controllers/productoController')
const {getStock}=require('../controllers/stockcontroller')
const {postEntrada}=require('../controllers/stockcontroller')
const {registrarUsuario, getUsuarios, deleteUsuario, reintegroUsuario}= require('../controllers/userController')
const multer=require('multer')
const path = require('path');
const { getEntrada } = require('../controllers/entradaController');
const { getRiego } = require('../controllers/riegoController');
const { getEstado } = require('../controllers/estadoController');
const { getFerti } = require('../controllers/tipofertilizanteController');
const { getMarcaFerti } = require('../controllers/fertilizanteMarcaController');
const { getTipoSemilla } = require('../controllers/tipoSemillaController');
const { getMarcaSemillas } = require('../controllers/marcaSemillaController');
const { getSiembraActivas, postSiembra } = require('../controllers/siembraController');
const { getEmpaque } = require('../controllers/empaqueController');

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





router.get('/salida',getSalida);
router.get('/entrada',getEntrada);
router.get('/productos/get',getProducts);
router.get('/productos/get/id',getPorductosId);
router.get('/stock/get',getStock);
router.get('/getUsuarios',getUsuarios);
router.get('/riego/get',getRiego);
router.get('/estado/get',getEstado);
router.get('/fertilizantes/get',getFerti);
router.get('/marca_fertilizante/get',getMarcaFerti);
router.get('/tipo_semilla/get',getTipoSemilla);
router.get('/marca_semilla/get',getMarcaSemillas);
router.get('/siembras/get',getSiembraActivas);
router.get('/productos/get/select',getProductsSelect);
router.get('/empaque/get', getEmpaque)

router.post('/login', login);
router.post('/registroUser', registrarUsuario);
router.post('/saveProduct',avatarSubir, saveProduct);
router.post('/post/entrada', postEntrada);
router.post('/postEntredaSalida', postEntredaSalida);
router.post('/post/siembra/save', postSiembra);

router.put('/reintegrarUsuario/:id', reintegroUsuario)

router.delete('/producto/delete/:id/:nombree/:marcaa',deleteProducts);
router.delete('/deleteUsuario/:id', deleteUsuario)


module.exports = router;