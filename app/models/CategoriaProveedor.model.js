module.exports = (sequelize, Sequelize) => {
    const CategoriaProveedor = sequelize.define("CategoriasProveedores", {
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
  
    return CategoriaProveedor;
  };