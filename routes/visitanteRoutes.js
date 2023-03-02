//======================= importando Routers e Express =================
const express = require('express')
const router = express.Router()
const visitanteController = require('../Controllers/visitanteController');

router.get('/home' , visitanteController);

router.get('/login' , visitanteController);

router.get('/register' , visitanteController);

router.get('/cursos' , visitanteController);

router.get('/simulados' , visitanteController);

router.get('/recados' , visitanteController);

router.get('/perfil' , visitanteController);

router.get('/materiaisgrat' , visitanteController);

router.get('/olimpiadas' , visitanteController);

router.get('/gagaresolve' , visitanteController);