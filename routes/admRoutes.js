const express = require('express');
const router = express.Router();

const AdmController = require("../Controllers/AdmController");

router.post('/adm/database/clean', AdmController.cleanDatabase);
router.post('/adm/database/delete', AdmController.deleteDatabase);

module.exports = router;