module.exports = (sequelize, DataTypes) => {
    const Consulta = sequelize.define('consulta', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idPaciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idMedico: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(1), // CHAR no Sequelize
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'consultas',
        timestamps: false,
    });

    return Consulta;
};
