module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("Proveedores", {
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
        allowNull: false,
        defaultValue:"Ciudad"
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
      ManejaCredito: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      Comentarios: {
        type:Sequelize.TEXT
      },
      TelefonoPrincipal: {
        type:Sequelize.BIGINT
      },
      HorarioLaboral: {
        type:Sequelize.STRING
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Proveedor;
  };