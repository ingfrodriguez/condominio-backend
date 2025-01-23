module.exports = (sequelize, Sequelize) => {
    const Contacto = sequelize.define("Contactos", {
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Telefono: {
        type:Sequelize.BIGINT,
        allowNull:false
      },
      Email: {
        type: Sequelize.STRING
      },
      Notas: {
        type:Sequelize.STRING
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Contacto;
  };