module.exports = (sequelize, Sequelize) => {
    const TipoIngreso = sequelize.define("TipoIngresos", {
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
  
    return TipoIngreso;
  };