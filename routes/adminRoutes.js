const express = require('express');
const router = express.Router();

const AdmController = require("../Controllers/AdmController");

router.post('/adm/role/modify', function (req, res) {
    
});

router.post('/adm/database/clean', AdmController.cleanDatabase);

router.post('/adm/database/delete', AdmController.deleteDatabase);