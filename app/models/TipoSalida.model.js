module.exports = (sequelize, Sequelize) => {
    const TipoSalida = sequelize.define("TipoSalidas", {
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return TipoSalida;
  };