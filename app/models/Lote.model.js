module.exports = (sequelize, Sequelize) => {
    const Lote = sequelize.define("Lotes", {
      Numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Comentarios: {
        type:Sequelize.TEXT
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Lote;
  };
