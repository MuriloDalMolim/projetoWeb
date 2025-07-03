const express = require('express');
const router = express.Router();
const prontuarioController = require('../controllers/prontuarioController');
const auth = require('../middlewares/auth');

router.get('/:idPaciente', auth.verifyToken, prontuarioController.listar);
router.post('/:idPaciente', auth.verifyToken, auth.isMedico, prontuarioController.adicionarEntrada);
router.put('/:idPaciente/:idConsulta', auth.verifyToken, auth.isMedico, prontuarioController.atualizarEntrada);
router.delete('/:idPaciente/:idConsulta', auth.verifyToken, auth.isMedico, prontuarioController.deletarEntrada);

module.exports = router;
