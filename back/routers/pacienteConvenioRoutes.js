const express = require('express');
const router = express.Router();
const pacienteConvenioController = require('../controllers/pacienteConvenioController');

// Adicionar convênio a paciente
router.post('/', pacienteConvenioController.addConvenioToPaciente);

// Listar convênios de um paciente
router.get('/:idPaciente', pacienteConvenioController.getConveniosByPaciente);

// Remover convênio de paciente
router.delete('/:idPaciente/:idConvenio', pacienteConvenioController.removeConvenioFromPaciente);

module.exports = router;
