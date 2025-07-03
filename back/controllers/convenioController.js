const db = require('../config/db');
const Convenio = db.models.Convenio;

module.exports = {
    async listar(req, res) {
        try {
            const convenios = await Convenio.findAll();
            res.json(convenios);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar convênios.', error });
        }
    },

    async buscarPorId(req, res) {
        try {
            const convenio = await Convenio.findByPk(req.params.id);
            if (!convenio) return res.status(404).json({ message: 'Convênio não encontrado.' });
            res.json(convenio);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar convênio.', error });
        }
    },

    async criar(req, res) {
        try {
            const novoConvenio = await Convenio.create(req.body);
            res.json(novoConvenio);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar convênio.', error });
        }
    },

    async atualizar(req, res) {
        try {
            const convenio = await Convenio.findByPk(req.params.id);
            if (!convenio) return res.status(404).json({ message: 'Convênio não encontrado.' });

            await convenio.update(req.body);
            res.json({ message: 'Convênio atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar convênio.', error });
        }
    },

    async deletar(req, res) {
        try {
            const convenio = await Convenio.findByPk(req.params.id);
            if (!convenio) return res.status(404).json({ message: 'Convênio não encontrado.' });

            await convenio.destroy();
            res.json({ message: 'Convênio deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar convênio.', error });
        }
    }
};
