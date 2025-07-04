const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const Paciente = db.models.Paciente;

router.get('/', auth.verifyToken, async (req, res) => {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
});

router.get('/:id', auth.verifyToken, async (req, res) => {
    try {
        console.log('Buscando paciente com id:', req.params.id);

        const paciente = await Paciente.findByPk(req.params.id);

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        res.json(paciente);
    } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        res.status(500).json({ message: 'Erro ao buscar paciente.' });
    }
});

router.post('/', auth.verifyToken, auth.isMedico, async (req, res) => {
    const paciente = await Paciente.create(req.body);
    res.json(paciente);
});

router.put('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Paciente.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Paciente atualizado' });
});

router.delete('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Paciente.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Paciente deletado' });
});

module.exports = router;
