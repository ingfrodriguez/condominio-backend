module.exports = (sequelize, Sequelize) => {
    const UnidadMedida = sequelize.define("UnidadesMedidas", {
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Abreviatura: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return UnidadMedida;
  };