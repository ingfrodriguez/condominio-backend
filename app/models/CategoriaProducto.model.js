module.exports = (sequelize, Sequelize) => {
    const CategoriaProducto = sequelize.define("CategoriasProductos", {
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    });
  
    return CategoriaProducto;
  };