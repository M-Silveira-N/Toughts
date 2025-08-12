const express = require('express');
const router = express.Router();
//Controllers
const ToughtController = require('../controllers/ToughtController')
//Middlewares
const checkAuth = require('../middlewares/auth').checkAuth

router.get('/dashboard', checkAuth,ToughtController.dashboard)

router.get('/', ToughtController.showToughts);

module.exports = router;
