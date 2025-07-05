const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const Medico = db.models.Medico;

router.get('/', auth.verifyToken, async (req, res) => {
    const medicos = await Medico.findAll();
    res.json(medicos);
});

router.get('/:id', auth.verifyToken, async (req, res) => {
    try {
        console.log('Buscando médico com id:', req.params.id); 

        const medico = await Medico.findByPk(req.params.id);

        if (!medico) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }

        res.json(medico);
    } catch (error) {
        console.error('Erro ao buscar médico:', error);
        res.status(500).json({ message: 'Erro ao buscar médico.' });
    }
});


router.post('/', auth.verifyToken, auth.isMedico, async (req, res) => {
    const medico = await Medico.create(req.body);
    res.json(medico);
});

router.put('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    const updateData = { ...req.body };
    if (!updateData.senha) {
        delete updateData.senha;
    }
    try {
        await Medico.update(updateData, { where: { id: req.params.id } });
        res.json({ message: 'Médico atualizado' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar médico', error: err.message });
    }
});

router.delete('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Medico.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Médico deletado' });
});

module.exports = router;
