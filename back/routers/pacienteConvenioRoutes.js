const express = require('express');
const router = express.Router();
const db = require('../config/db');
const PacienteConvenio = db.models.PacienteConvenio; 
router.get('/:idPaciente/:idConvenio', async (req, res) => {
    const { idPaciente, idConvenio } = req.params;
    try {
        const associacao = await PacienteConvenio.findOne({
            where: {
                idPaciente: idPaciente,
                idConvenio: idConvenio
            }
        });

        if (!associacao) {
            return res.status(404).json({ message: 'Associação não encontrada.' });
        }
        res.status(200).json(associacao);
    } catch (error) {
        console.error('Erro ao buscar associação no backend:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const associacoes = await PacienteConvenio.findAll();
        res.json(associacoes);
    } catch (error) {
        console.error('Erro ao buscar associações:', error);
        res.status(500).json({ message: 'Erro ao buscar associações' });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Dados recebidos no body:', req.body); 

        const { idPaciente, idConvenio, numeroPlano } = req.body;

      
        if (!idPaciente || !idConvenio || !numeroPlano) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const novaAssociacao = await PacienteConvenio.create({ idPaciente, idConvenio, numeroPlano });
        res.status(201).json(novaAssociacao);
    } catch (error) {
        console.error('Erro ao criar associação:', error);
        res.status(500).json({ message: 'Erro ao criar associação.', error: error.message });
    }
});

router.put('/:idPaciente/:idConvenio', async (req, res) => {
    try {
        const { idPaciente, idConvenio } = req.params;
        const { numeroPlano } = req.body;

        const associacao = await PacienteConvenio.findOne({ where: { idPaciente, idConvenio } });
        if (!associacao) {
            return res.status(404).json({ message: 'Associação não encontrada' });
        }

        await associacao.update({ numeroPlano });
        res.json(associacao);
    } catch (error) {
        console.error('Erro ao atualizar associação:', error);
        res.status(500).json({ message: 'Erro ao atualizar associação', error: error.message });
    }
});

router.delete('/:idPaciente/:idConvenio', async (req, res) => {
    try {
        const { idPaciente, idConvenio } = req.params;

        const associacao = await PacienteConvenio.findOne({ where: { idPaciente, idConvenio } });
        if (!associacao) {
            return res.status(404).json({ message: 'Associação não encontrada' });
        }

        await associacao.destroy();
        res.json({ message: 'Associação deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar associação:', error);
        res.status(500).json({ message: 'Erro ao deletar associação', error: error.message });
    }
});

module.exports = router;