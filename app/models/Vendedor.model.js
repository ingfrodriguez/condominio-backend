module.exports = (sequelize, Sequelize) => {
    const Vendedor = sequelize.define("Vendedores", {
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
      Telefono: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      Celular: {
        type: Sequelize.BIGINT
      },
      Domicilio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING
      },
      Comentarios: {
        type:Sequelize.TEXT
      },
      HorarioLaboral: {
        type:Sequelize.STRING,
        allowNull: false
      },
      ComisionAsignada: {
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Vendedor;
  };