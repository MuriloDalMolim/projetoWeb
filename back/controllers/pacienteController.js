const db = require('../config/db');
const Paciente = db.models.Paciente;

module.exports = {
    async listar(req, res) {
        try {
            const pacientes = await Paciente.findAll();
            res.json(pacientes);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar pacientes.', error });
        }
    },

    async buscarPorId(req, res) {
        try {
            const paciente = await Paciente.findByPk(req.params.id);
            if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado.' });
            res.json(paciente);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar paciente.', error });
        }
    },

    async criar(req, res) {
        try {
            const novoPaciente = await Paciente.create(req.body);
            res.json(novoPaciente);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar paciente.', error });
        }
    },

    async atualizar(req, res) {
        try {
            const paciente = await Paciente.findByPk(req.params.id);
            if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado.' });

            await paciente.update(req.body);
            res.json({ message: 'Paciente atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar paciente.', error });
        }
    },

    async deletar(req, res) {
        try {
            const paciente = await Paciente.findByPk(req.params.id);
            if (!paciente) return res.status(404).json({ message: 'Paciente não encontrado.' });

            await paciente.destroy();
            res.json({ message: 'Paciente deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar paciente.', error });
        }
    }
};
