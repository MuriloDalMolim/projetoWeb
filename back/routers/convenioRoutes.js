const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const Convenio = db.models.Convenio;

router.get('/', auth.verifyToken, async (req, res) => {
    const convenios = await Convenio.findAll();
    res.json(convenios);
});

router.post('/', auth.verifyToken, auth.isMedico, async (req, res) => {
    const convenio = await Convenio.create(req.body);
    res.json(convenio);
});

router.put('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Convenio.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Convênio atualizado' });
});

router.delete('/:id', auth.verifyToken, auth.isMedico, async (req, res) => {
    await Convenio.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Convênio deletado' });
});

module.exports = router;
