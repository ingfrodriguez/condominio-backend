module.exports = (sequelize, Sequelize) => {
    const Visita = sequelize.define("Visitas", {
      GeolocationPositionAccuracy: {
        type:Sequelize.DECIMAL
      },
      GeolocationPositionLatitude: {
        type:Sequelize.DECIMAL
      },
      GeolocationPositionLongitude: {
        type:Sequelize.DECIMAL
      },
      Hora: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
      },
      Fecha: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Visita;
  };
