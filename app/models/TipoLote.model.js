module.exports = (sequelize, Sequelize) => {
    const TipoLote = sequelize.define("TiposLotes", {
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return TipoLote;
  };
