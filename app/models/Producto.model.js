module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Productos", {
      Codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Activo: {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
        get(){
          return this.getDataValue('Activo') ? 'Si' : 'No'
        },
        Set(value){
          this.setDataValue('Activo', value=='Si' ? true :false);
        }
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Descripcion: {
        type: Sequelize.STRING
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return Producto;
  };