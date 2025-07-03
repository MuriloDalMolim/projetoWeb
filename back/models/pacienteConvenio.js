module.exports = (sequelize, DataTypes) => {
    const PacienteConvenio = sequelize.define('paciente_convenio', {
        idPaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idConvenio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        numeroPlano: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'paciente_convenio',
        timestamps: false,
    });

    return PacienteConvenio;
};
