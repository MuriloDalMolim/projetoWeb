const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const Medico = db.models.Medico;

router.get('/', auth.verifyToken, async (req, res) => {
    const medicos = await Medico.findAll();
    res.json(medicos);
});

router.post('/', auth.verifyToken, auth.isMedico, async (req, res) => {
    const medico = await Medico.create(req.body);
    res.json(medico);
});

router.put('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Medico.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Médico atualizado' });
});

router.delete('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Medico.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Médico deletado' });
});

module.exports = router;
