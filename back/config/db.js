const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('web_db2', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres', 
});


// Models
const MedicoModel = require('../models/medico')(sequelize, DataTypes);
const PacienteModel = require('../models/paciente')(sequelize, DataTypes);
const ConvenioModel = require('../models/convenio')(sequelize, DataTypes);
const ConsultaModel = require('../models/consulta')(sequelize, DataTypes);
const PacienteConvenioModel = require('../models/pacienteConvenio')(sequelize, DataTypes);

// Relacionamentos
MedicoModel.hasMany(ConsultaModel, { foreignKey: 'idMedico' });
ConsultaModel.belongsTo(MedicoModel, { foreignKey: 'idMedico' });

PacienteModel.hasMany(ConsultaModel, { foreignKey: 'idPaciente' });
ConsultaModel.belongsTo(PacienteModel, { foreignKey: 'idPaciente' });

PacienteModel.belongsToMany(ConvenioModel, { through: PacienteConvenioModel, foreignKey: 'idPaciente', otherKey: 'idConvenio', as: 'convenios'});
ConvenioModel.belongsToMany(PacienteModel, { through: PacienteConvenioModel, foreignKey: 'idConvenio', otherKey: 'idPaciente', as: 'pacientes'});

// Exportar conexão e models
module.exports = {
    sequelize,
    Sequelize,
    models: {
        Medico: MedicoModel,
        Paciente: PacienteModel,
        Convenio: ConvenioModel,
        Consulta: ConsultaModel,
        PacienteConvenio: PacienteConvenioModel
    }
};
