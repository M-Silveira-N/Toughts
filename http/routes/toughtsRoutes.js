const express = require('express');
const router = express.Router();
//Controllers
const ToughtController = require('../controllers/ToughtController')
//Middlewares
const checkAuth = require('../middlewares/auth').checkAuth

router.get('/add', checkAuth, ToughtController.createTought);

router.post('/add', checkAuth, ToughtController.createToughtSave);

router.get('/dashboard', checkAuth,ToughtController.dashboard)

router.post('/remove', checkAuth, ToughtController.removeTought)

router.get('/', ToughtController.showToughts);

module.exports = router;
