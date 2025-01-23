module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Clientes", {
      NIT: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      RazonSocial: {
        type:Sequelize.STRING,
        allowNull: false
      },
      DireccionComercial: {
        type:Sequelize.STRING,
        allowNull: false
      },
      Activo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
        get(){
          return this.getDataValue('Activo') ? 'Si' : 'No'
        }        
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING
      },
      Credito: {
        type: Sequelize.INTEGER
      },
      Valoracion: {
        type: Sequelize.INTEGER
      },
      DireccionEntrega: {
        type:Sequelize.STRING
      },
      Comentarios: {
        type:Sequelize.TEXT
      },
      TelefonoPrincipal: {
        type:Sequelize.BIGINT
      },
      HorarioLaboral: {
        type:Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Cliente;
  };
