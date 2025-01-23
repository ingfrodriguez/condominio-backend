module.exports = (sequelize, Sequelize) => {
    const Ingreso = sequelize.define("Ingresos", {
      FechaIngreso: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
      },
      SerieNumero: {
        type: Sequelize.STRING
      },
      FacturaNumero: {
        type: Sequelize.STRING
      },
      Notas:{
        type: Sequelize.STRING
      },
      Documento:{
        type: Sequelize.STRING
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Ingreso;
  };