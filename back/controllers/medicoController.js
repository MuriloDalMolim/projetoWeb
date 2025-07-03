const db = require('../config/db');
const Medico = db.models.Medico;

module.exports = {
    async listar(req, res) {
        try {
            const medicos = await Medico.findAll();
            res.json(medicos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar médicos.', error });
        }
    },

    async buscarPorId(req, res) {
        try {
            const medico = await Medico.findByPk(req.params.id);
            if (!medico) return res.status(404).json({ message: 'Médico não encontrado.' });
            res.json(medico);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar médico.', error });
        }
    },

    async criar(req, res) {
        try {
            const novoMedico = await Medico.create(req.body);
            res.json(novoMedico);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar médico.', error });
        }
    },

    async atualizar(req, res) {
        try {
            const medico = await Medico.findByPk(req.params.id);
            if (!medico) return res.status(404).json({ message: 'Médico não encontrado.' });

            await medico.update(req.body);
            res.json({ message: 'Médico atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar médico.', error });
        }
    },

    async deletar(req, res) {
        try {
            const medico = await Medico.findByPk(req.params.id);
            if (!medico) return res.status(404).json({ message: 'Médico não encontrado.' });

            await medico.destroy();
            res.json({ message: 'Médico deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar médico.', error });
        }
    }
};
