const express = require('express');
const router = express.Router();
const prontuarioController = require('../controllers/prontuarioController');
const auth = require('../middlewares/auth');

// Listar prontuário de um paciente
router.get('/:idPaciente', auth.verifyToken, prontuarioController.listar);

// Adicionar entrada no prontuário
router.post('/:idPaciente', auth.verifyToken, auth.isMedico, prontuarioController.adicionarEntrada);

// Atualizar entrada no prontuário
router.put('/:idPaciente/:idConsulta', auth.verifyToken, auth.isMedico, prontuarioController.atualizarEntrada);

// Deletar entrada no prontuário
router.delete('/:idPaciente/:idConsulta', auth.verifyToken, auth.isMedico, prontuarioController.deletarEntrada);

module.exports = router;
