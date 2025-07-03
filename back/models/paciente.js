module.exports = (sequelize, DataTypes) => {
    const Paciente = sequelize.define('paciente', {
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
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'pacientes',
        timestamps: false,
    });

    return Paciente;
};
