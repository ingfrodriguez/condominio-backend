module.exports = (sequelize, Sequelize) => {
    const Salida = sequelize.define("Salidas", {
      FechaSalida: {
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
  
    return Salida;
  };