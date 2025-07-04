module.exports = (sequelize, DataTypes) => {
    const PacienteConvenio = sequelize.define('pacienteConvenio', {
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
        tableName: 'pacienteconvenio',
        timestamps: false,
    });

    return PacienteConvenio;
};
