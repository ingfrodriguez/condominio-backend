module.exports = (sequelize, Sequelize) => {
    const Impuesto = sequelize.define("Impuestos", {
      Nombre: {
        type: Sequelize.STRING
      },
      Porcentaje: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Impuesto;
  };