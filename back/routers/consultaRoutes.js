const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const Consulta = db.models.Consulta;

router.get('/', auth.verifyToken, async (req, res) => {
    const consultas = await Consulta.findAll();
    res.json(consultas);
});

router.post('/', auth.verifyToken, auth.isMedico, async (req, res) => {
    const consulta = await Consulta.create(req.body);
    res.json(consulta);
});

router.put('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Consulta.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Consulta atualizada' });
});

router.delete('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Consulta.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Consulta deletada' });
});

module.exports = router;
