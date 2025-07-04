const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const Convenio = db.models.Convenio;

// Listar todos os convênios
router.get('/', auth.verifyToken, async (req, res) => {
    const convenios = await Convenio.findAll();
    res.json(convenios);
});

// ADICIONADO: Buscar um convênio por ID
router.get('/:id', auth.verifyToken, async (req, res) => { // Nova rota para buscar por ID
    try {
        const convenio = await Convenio.findByPk(req.params.id);
        if (!convenio) {
            return res.status(404).json({ message: 'Convênio não encontrado' });
        }
        res.json(convenio);
    } catch (error) {
        console.error('Erro ao buscar convênio por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar convênio' });
    }
});

// Criar novo convênio
router.post('/', auth.verifyToken, auth.isMedico, async (req, res) => {
    const convenio = await Convenio.create(req.body);
    res.json(convenio);
});

// Atualizar convênio pelo ID
router.put('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Convenio.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Convênio atualizado' });
});

// Deletar convênio pelo ID
router.delete('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Convenio.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Convênio deletado' });
});

module.exports = router;