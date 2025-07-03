const Prontuario = require('../models/prontuario');
const db = require('../config/db');
const Consulta = db.models.Consulta;

module.exports = {

    async listar(req, res) {
        try {
            const prontuario = await Prontuario.findOne({ id_paciente: req.params.idPaciente });
            if (!prontuario) return res.status(404).json({ message: 'Prontuário não encontrado.' });

            res.json(prontuario);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar prontuário.', error });
        }
    },

    async adicionarEntrada(req, res) {
        const { id_consulta, data, sintomas, diagnostico, prescricao, observacoes } = req.body;

        try {
            // Valida se consulta existe no PostgreSQL
            const consultaExiste = await Consulta.findByPk(id_consulta);
            if (!consultaExiste) {
                return res.status(400).json({ message: 'Consulta não encontrada no banco relacional.' });
            }

            let prontuario = await Prontuario.findOne({ id_paciente: req.params.idPaciente });

            if (!prontuario) {
                prontuario = new Prontuario({ id_paciente: req.params.idPaciente, historico: [] });
            }

            prontuario.historico.push({
                id_consulta,
                data,
                sintomas,
                diagnostico,
                prescricao,
                observacoes
            });

            await prontuario.save();

            res.status(201).json({ message: 'Entrada adicionada ao prontuário.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar entrada.', error });
        }
    },

    async atualizarEntrada(req, res) {
        const { data, sintomas, diagnostico, prescricao, observacoes } = req.body;

        try {
            // Valida se consulta existe no PostgreSQL
            const consultaExiste = await Consulta.findByPk(req.params.idConsulta);
            if (!consultaExiste) {
                return res.status(400).json({ message: 'Consulta não encontrada no banco relacional.' });
            }

            const prontuario = await Prontuario.findOne({ id_paciente: req.params.idPaciente });
            if (!prontuario) return res.status(404).json({ message: 'Prontuário não encontrado.' });

            await Prontuario.updateOne(
                { id_paciente: req.params.idPaciente, "historico.id_consulta": req.params.idConsulta },
                { $set: {
                    "historico.$.data": data,
                    "historico.$.sintomas": sintomas,
                    "historico.$.diagnostico": diagnostico,
                    "historico.$.prescricao": prescricao,
                    "historico.$.observacoes": observacoes
                }}
            );

            res.json({ message: 'Entrada do prontuário atualizada com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar entrada.', error });
        }
    },

    async deletarEntrada(req, res) {
        try {
            await Prontuario.updateOne(
                { id_paciente: req.params.idPaciente },
                { $pull: { historico: { id_consulta: req.params.idConsulta } } }
            );

            res.json({ message: 'Entrada do prontuário removida com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar entrada.', error });
        }
    }
};
