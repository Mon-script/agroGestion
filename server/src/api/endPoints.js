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
const { getRiego, createRiego } = require('../controllers/riegoController');
const { getEstado, createEstado } = require('../controllers/estadoController');
const { getFerti, createFerti } = require('../controllers/tipofertilizanteController');
const { getMarcaFerti, createMarcaFerti } = require('../controllers/fertilizanteMarcaController');
const { getTipoSemilla, createTipoSemilla } = require('../controllers/tipoSemillaController');
const { getMarcaSemillas, createMarcaSemilla } = require('../controllers/marcaSemillaController');
const { getSiembraActivas, postSiembra, putSiembra } = require('../controllers/siembraController');
const { getEmpaque, createEmpaque } = require('../controllers/empaqueController');
const { getCosecha, registrarCosecha } = require('../controllers/cosechaController');

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
router.get('/empaque/get', getEmpaque);
router.get('/cosechas/get', getCosecha)

router.post('/login', login);
router.post('/registroUser', registrarUsuario);
router.post('/saveProduct',avatarSubir, saveProduct);
router.post('/post/entrada', postEntrada);
router.post('/postEntredaSalida', postEntredaSalida);
router.post('/post/siembra/save', postSiembra);
router.post('/post/cosecha/save', registrarCosecha)
//materiales
router.post('/post/empaque/save', createEmpaque)
router.post('/post/riengo/save', createRiego)
router.post('/post/estado/save', createEstado)
router.post('/post/tipoferti/save', createFerti)
router.post('/post/marcaferti/save', createMarcaFerti)
router.post('/post/tiposemilla/save', createTipoSemilla)
router.post('/post/marcasemilla/save', createMarcaSemilla)

router.put('/reintegrarUsuario/:id', reintegroUsuario)
router.put('/siembra/update', putSiembra)

router.delete('/producto/delete/:id/:nombree/:marcaa',deleteProducts);
router.delete('/deleteUsuario/:id', deleteUsuario)


module.exports = router;