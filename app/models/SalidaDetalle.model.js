module.exports = (sequelize, Sequelize) => {
    const SalidaDetalle = sequelize.define("SalidasDetalle", {
      Cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CostoUnitario: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false
      },
      CostoTotal: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return SalidaDetalle;
  };