const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require('../middlewares/auth');

// Listar todas as consultas
router.get('/', auth.verifyToken, consultaController.listar);

// Buscar consulta por ID
router.get('/:id', auth.verifyToken, consultaController.buscarPorId);

// Criar consulta
router.post('/', auth.verifyToken, auth.isMedico, consultaController.criar);

// Atualizar consulta
router.put('/:id', auth.verifyToken, auth.isMedico, consultaController.atualizar);

// Deletar consulta
router.delete('/:id', auth.verifyToken, auth.isMedico, consultaController.deletar);

module.exports = router;
