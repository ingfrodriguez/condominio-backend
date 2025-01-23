module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("Personas", {
      NIT: {
        type:Sequelize.STRING,
        unique: true
      },
      RazonSocial: {
        type:Sequelize.STRING
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
      Direccion: {
        type: Sequelize.STRING
      },
      Comentarios: {
        type:Sequelize.TEXT
      },
      TelefonoPrincipal: {
        type:Sequelize.BIGINT
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Persona;
  };
