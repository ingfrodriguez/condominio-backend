module.exports = (sequelize, Sequelize) => {
    const TipoPersona = sequelize.define("TiposPersonas", {
      Nombre: {
        type:Sequelize.STRING
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return TipoPersona;
  };
