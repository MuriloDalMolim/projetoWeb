const db = require('../config/db');
const Paciente = db.models.Paciente;
const Convenio = db.models.Convenio;

exports.addConvenioToPaciente = async (req, res) => {
  const { idPaciente, idConvenio, numeroPlano } = req.body;

  try {
    const paciente = await Paciente.findByPk(idPaciente);
    const convenio = await Convenio.findByPk(idConvenio);

    if (!paciente || !convenio) {
      return res.status(404).json({ message: 'Paciente ou Convênio não encontrado.' });
    }

    await paciente.addConvenio(convenio, { through: { numeroPlano } });

    res.status(201).json({ message: 'Convênio adicionado ao paciente com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar convênio.', error });
  }
};

exports.getConveniosByPaciente = async (req, res) => {
  const { idPaciente } = req.params;

  try {
    const paciente = await Paciente.findByPk(idPaciente, {
      include: {
        model: Convenio,
        as: 'convenios',
        through: { attributes: ['numeroPlano'] },
      },
    });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado.' });
    }

    res.json(paciente.convenios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar convênios.', error });
  }
};

exports.removeConvenioFromPaciente = async (req, res) => {
  const { idPaciente, idConvenio } = req.params;

  try {
    const paciente = await Paciente.findByPk(idPaciente);
    const convenio = await Convenio.findByPk(idConvenio);

    if (!paciente || !convenio) {
      return res.status(404).json({ message: 'Paciente ou Convênio não encontrado.' });
    }

    await paciente.removeConvenio(convenio);

    res.json({ message: 'Convênio removido do paciente com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover convênio.', error });
  }
};
