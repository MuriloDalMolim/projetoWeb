const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require('../middlewares/auth');

router.get('/', auth.verifyToken, consultaController.listar);

router.get('/:id', auth.verifyToken, consultaController.buscarPorId);

router.post('/', auth.verifyToken, auth.isMedico, consultaController.criar);

router.put('/:id', auth.verifyToken, auth.isMedico, consultaController.atualizar);

router.delete('/:id', auth.verifyToken, auth.isMedico, consultaController.deletar);

module.exports = router;
