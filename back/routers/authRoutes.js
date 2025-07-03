const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const Medico = db.models.Medico;
const Paciente = db.models.Paciente;

router.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    try {
        // Tenta logar como médico usando CRM
        let user = await Medico.findOne({ where: { crm: login, senha } });
        if (user) {
            const token = jwt.sign({ id: user.id, role: 'medico' }, 'seusegredo', { expiresIn: '1h' });
            return res.json({ token, role: 'medico' });
        }

        // Se não encontrar médico, tenta logar como paciente usando CPF
        user = await Paciente.findOne({ where: { cpf: login, senha } });
        if (user) {
            const token = jwt.sign({ id: user.id, role: 'paciente' }, 'seusegredo', { expiresIn: '1h' });
            return res.json({ token, role: 'paciente' });
        }

        res.status(401).json({ message: 'Credenciais inválidas.' });

    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

module.exports = router;
