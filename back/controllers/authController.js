const jwt = require('jsonwebtoken');
const db = require('../config/db_sequelize');
const Medico = db.Medico;
const Paciente = db.Paciente;

const JWT_SECRET = '1234';

const registerMedico = async (req, res) => {
    const { nome, senha, crm, especialidade, email } = req.body;
    try {
        const medicoExistente = await Medico.findOne({ where: { crm: crm } });
        if (medicoExistente) {
            return res.status(400).json({ message: 'CRM já cadastrado.' });
        }
        const novoMedico = await Medico.create({ nome, senha, crm, especialidade, email });
        const medicoResponse = { ...novoMedico.toJSON() };
        delete medicoResponse.senha;

        const token = jwt.sign({ id: novoMedico.id, role: 'medico' }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Médico registrado com sucesso!', medico: medicoResponse, token });
    } catch (error) {
        console.error('Erro ao registrar médico:', error);
        res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
};

const login = async (req, res) => {
    const { isMedico, isPaciente, crm, cpf, senha } = req.body;

    try {
        let user, payload;

        if (isMedico) {
            user = await Medico.findOne({ where: { crm } });
            if (!user || !user.validPassword(senha)) {
                return res.status(401).json({ message: 'CRM ou senha inválidos.' });
            }

            payload = { id: user.id, role: 'medico' };
        } else if (isPaciente) {
            user = await Paciente.findOne({ where: { cpf } });
            if (!user || user.senha !== senha) {
                return res.status(401).json({ message: 'CPF ou senha inválidos.' });
            }

            payload = { id: user.id, role: 'paciente' };
        } else {
            return res.status(400).json({ message: 'Tipo de usuário inválido.' });
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido!', token, usuario: payload });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    registerMedico,
    login
};
