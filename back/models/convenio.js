module.exports = (sequelize, DataTypes) => {
    const Convenio = sequelize.define('convenio', {
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
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'convenios',
        timestamps: false,
    });

    return Convenio;
};
