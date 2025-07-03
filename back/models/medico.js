const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Medico = sequelize.define('medico', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        crm: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        especialidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'medicos',
        timestamps: false,
    });

    return Medico;
};
