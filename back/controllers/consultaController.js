const db = require('../config/db');

const Consulta = db.models.Consulta;

module.exports = {
    async listar(req, res) {
        try {
            const consultas = await Consulta.findAll();
            res.json(consultas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar consultas.', error });
        }
    },

    async buscarPorId(req, res) {
        try {
            const consulta = await Consulta.findByPk(req.params.id);
            if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada.' });
            res.json(consulta);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar consulta.', error });
        }
    },

    async criar(req, res) {
        try {
            const { idPaciente, idMedico, local, status, data } = req.body;

            const novaConsulta = await Consulta.create({
                idPaciente,
                idMedico,
                local,
                status,
                data
            });

            res.status(201).json(novaConsulta);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar consulta.', error });
        }
    },

    async atualizar(req, res) {
        try {
            const consulta = await Consulta.findByPk(req.params.id);
            if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada.' });

            const { local, status, data } = req.body;

            await consulta.update({ local, status, data });
            res.json({ message: 'Consulta atualizada com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar consulta.', error });
        }
    },

    async deletar(req, res) {
        try {
            const consulta = await Consulta.findByPk(req.params.id);
            if (!consulta) return res.status(404).json({ message: 'Consulta não encontrada.' });

            await consulta.destroy();
            res.json({ message: 'Consulta deletada com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar consulta.', error });
        }
    }
};
