//======================= importando Routers e Express =================
const express = require('express')
const router = express.Router()
const visitanteController = require('../Controllers/visitanteController');

//router.get('/home' , visitanteController.showHome);

router.post('/login' , visitanteController.showLogin);

router.post('/register' , visitanteController.showRegister);

//router.get('/cursos' , visitanteController.showCursos);

//router.get('/simulados' , visitanteController.showSimulados);

//router.get('/recados' , visitanteController.showRecados);

//router.get('/perfil' , visitanteController.showPerfil);

//router.get('/materiaisgrat' , visitanteController.materiaisgrat);

//router.get('/olimpiadas' , visitanteController.olimpiadas);

//router.get('/gagaresolve' , visitanteController.gagaresolve);

module.exports = router