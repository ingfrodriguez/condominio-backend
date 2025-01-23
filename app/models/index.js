
const config = require("../config/db.config.js");
const winston = require('winston');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    logQueryParameters: true,
    operatorsAliases: 0,    
    logging: msg => logger.info(msg), 
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

require('winston-daily-rotate-file');

  var transport = new winston.transports.DailyRotateFile({
    level: 'info',
    filename: 'app/resources/log/application-%DATE%.log',
    datePattern: 'DD-MM-YYYY',//'YYYY-MM-DD-HH' , ORIGINAL
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '100d'
  });


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    transport
  ],
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.model.js")(sequelize, Sequelize);
db.role = require("./Role.model.js")(sequelize, Sequelize);
db.Producto = require("./Producto.model.js")(sequelize, Sequelize);
db.CategoriaProducto = require("./CategoriaProducto.model.js")(sequelize, Sequelize);
db.UnidadMedida = require("./UnidadMedida.model.js")(sequelize, Sequelize);
db.CategoriaProveedor = require("./CategoriaProveedor.model.js")(sequelize, Sequelize);
db.Proveedor = require("./Proveedor.model.js")(sequelize, Sequelize);
db.Cliente = require("./Cliente.model.js")(sequelize, Sequelize);
db.Contacto = require("./Contacto.model.js")(sequelize, Sequelize);
db.Vendedor = require("./Vendedor.model.js")(sequelize, Sequelize);
db.TipoIngreso= require("./TipoIngreso.model.js")(sequelize, Sequelize);
db.Ingreso = require("./Ingreso.model.js")(sequelize, Sequelize);
db.IngresoDetalle = require("./IngresoDetalle.model.js")(sequelize, Sequelize);
db.Impuesto = require("./Impuesto.model.js")(sequelize, Sequelize);
db.TipoSalida= require("./TipoSalida.model.js")(sequelize, Sequelize);
db.Salida = require("./Salida.model.js")(sequelize, Sequelize);
db.SalidaDetalle = require("./SalidaDetalle.model.js")(sequelize, Sequelize);
db.Visita = require("./Visita.model.js")(sequelize, Sequelize);
db.Lote = require("./Lote.model.js")(sequelize, Sequelize);
db.TipoLote = require("./TipoLote.model.js")(sequelize, Sequelize);
db.Persona = require("./Persona.model.js")(sequelize, Sequelize);
db.TipoPersona = require("./TipoPersona.model.js")(sequelize, Sequelize);


//usuarios y roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
 
//CategoriaProducto
db.CategoriaProducto.hasMany(db.Producto,{
  foreignKey: 'CategoriaProductoId'
})
db.Producto.belongsTo(db.CategoriaProducto,{
  foreignKey: 'CategoriaProductoId'
})

//Producto
db.Producto.belongsTo(db.user,{
  as: 'UsuarioQueCreo',
  foreignKey: 'UsuarioCreo'
})
db.user.hasMany(db.Producto,{
  as: 'UsuarioQueCreo',
  foreignKey: 'UsuarioCreo'
})

db.Producto.belongsTo(db.user,{
  as: 'UsuarioQueModifico',
  foreignKey: 'UsuarioModifico'
})
db.user.hasMany(db.Producto,{
  as: 'UsuarioQueModifico',
  foreignKey: 'UsuarioModifico'
})
 
//UnidadMedida
db.UnidadMedida.hasMany(db.Producto,{
  foreignKey: 'UnidadMedidaId'
})
db.Producto.belongsTo(db.UnidadMedida,{
  foreignKey: 'UnidadMedidaId'
})

//Proveedor
db.CategoriaProveedor.belongsToMany(db.Proveedor, {
  through: "CategoriasAsignadasProveedores",
  as:"CategoriaAsignadaProveedor",
  foreignKey: "CategoriaId",
  otherKey: "ProveedorId"
});
db.Proveedor.belongsToMany(db.CategoriaProveedor, {
  through: "CategoriasAsignadasProveedores",
  as:"CategoriaAsignadaProveedor",
  foreignKey: "ProveedorId",
  otherKey: "CategoriaId"
});

db.Proveedor.hasMany(db.Contacto,{
  foreignKey: 'ProveedorId'
})
db.Contacto.belongsTo(db.Proveedor,{
  foreignKey: 'ProveedorId'
})


db.Proveedor.belongsTo(db.user,{
  foreignKey: 'UsuarioCreo'
})
db.user.hasMany(db.Proveedor,{
  foreignKey: 'UsuarioCreo'
})

db.Proveedor.belongsTo(db.user,{
  foreignKey: 'UsuarioModifico'
})
db.user.hasMany(db.Proveedor,{
  foreignKey: 'UsuarioModifico'
})


//Vendedor 
db.Vendedor.hasMany(db.Contacto,{
  foreignKey: 'VendedorId'
})
db.Contacto.belongsTo(db.Vendedor,{
  foreignKey: 'VendedorId'
})

db.Vendedor.belongsTo(db.user,{
  foreignKey: 'UsuarioCreo'
})
db.user.hasMany(db.Vendedor,{
  foreignKey: 'UsuarioCreo'
})

db.Vendedor.belongsTo(db.user,{
  foreignKey: 'UsuarioModifico'
})
db.user.hasMany(db.Vendedor,{
  foreignKey: 'UsuarioModifico'
})


//Cliente 
db.Cliente.hasMany(db.Contacto,{
  foreignKey: 'ClienteId'
})
db.Contacto.belongsTo(db.Cliente,{
  foreignKey: 'ClienteId'
})


db.Vendedor.hasMany(db.Cliente,{
  foreignKey: 'VendedorId'
})
db.Cliente.belongsTo(db.Vendedor,{
  foreignKey: 'VendedorId'
})


db.CategoriaProveedor.belongsToMany(db.Cliente, {
  through: "CategoriasAsignadasClientes",
  as:"CategoriaAsignadaCliente",
  foreignKey: "CategoriaId",
  otherKey: "ClienteId"
});
db.Cliente.belongsToMany(db.CategoriaProveedor, {
  through: "CategoriasAsignadasClientes",
  as:"CategoriaAsignadaCliente",
  foreignKey: "ClienteId",
  otherKey: "CategoriaId"
});

db.Cliente.belongsTo(db.user,{
  foreignKey: 'UsuarioCreo'
})
db.user.hasMany(db.Cliente,{
  foreignKey: 'UsuarioCreo'
})

db.Cliente.belongsTo(db.user,{
  foreignKey: 'UsuarioModifico'
})
db.user.hasMany(db.Cliente,{
  foreignKey: 'UsuarioModifico'
})

db.Vendedor.hasMany(db.Cliente,{
  foreignKey: 'VendedorId'
})
db.Cliente.belongsTo(db.Vendedor,{
  foreignKey: 'VendedorId'
})

//INGRESO DETALLE
db.Producto.hasMany(db.IngresoDetalle,{
  foreignKey: 'ProductoId'
})
db.IngresoDetalle.belongsTo(db.Producto,{
  foreignKey: 'ProductoId'
})

//INGRESO 
db.Ingreso.hasMany(db.IngresoDetalle,{
  foreignKey: 'IngresoId'
})
db.IngresoDetalle.belongsTo(db.Ingreso,{
  foreignKey: 'IngresoId'
})

db.Proveedor.hasMany(db.Ingreso,{
  foreignKey: 'ProveedorId'
})
db.Ingreso.belongsTo(db.Proveedor,{
  foreignKey: 'ProveedorId'
})

db.Ingreso.belongsTo(db.user,{
  foreignKey: 'UsuarioCreo'
})
db.user.hasMany(db.Ingreso,{
  foreignKey: 'UsuarioCreo'
})

db.Ingreso.belongsTo(db.user,{
  foreignKey: 'UsuarioModifico'
})
db.user.hasMany(db.Ingreso,{
  foreignKey: 'UsuarioModifico'
})

//TIPO INGRESO 
db.TipoIngreso.hasMany(db.Ingreso,{
  foreignKey: 'TipoIngresoId'
})
db.Ingreso.belongsTo(db.TipoIngreso,{
  foreignKey: 'TipoIngresoId'
})

//TIPO INGRESO 
db.Impuesto.hasMany(db.IngresoDetalle,{
  foreignKey: 'IVA'
})
db.IngresoDetalle.belongsTo(db.Impuesto,{
  foreignKey: 'IVA'
})

db.ROLES = ["superadmin", "admin", "ventas"];

module.exports = db;

//SALIDA DETALLE
db.Producto.hasMany(db.SalidaDetalle,{
  foreignKey: 'ProductoId'
})
db.SalidaDetalle.belongsTo(db.Producto,{
  foreignKey: 'ProductoId'
})

//SALIDA 
db.Salida.hasMany(db.SalidaDetalle,{
  foreignKey: 'SalidaId'
})
db.SalidaDetalle.belongsTo(db.Salida,{
  foreignKey: 'SalidaId'
})

db.Cliente.hasMany(db.Salida,{
  foreignKey: 'ClienteId'
})
db.Salida.belongsTo(db.Cliente,{
  foreignKey: 'ClienteId'
})

db.Vendedor.hasMany(db.Salida,{
  foreignKey: 'VendedorId'
})
db.Salida.belongsTo(db.Vendedor,{
  foreignKey: 'VendedorId'
})

db.Salida.belongsTo(db.user,{
  foreignKey: 'UsuarioCreo'
})
db.user.hasMany(db.Salida,{
  foreignKey: 'UsuarioCreo'
})

db.Salida.belongsTo(db.user,{
  foreignKey: 'UsuarioModifico'
})
db.user.hasMany(db.Salida,{
  foreignKey: 'UsuarioModifico'
})


//TIPO SALIDA 
db.TipoSalida.hasMany(db.Salida,{
  foreignKey: 'TipoSalidaId'
})
db.Salida.belongsTo(db.TipoSalida,{
  foreignKey: 'TipoSalidaId'
})

db.Impuesto.hasMany(db.SalidaDetalle,{
  foreignKey: 'IVA'
})
db.SalidaDetalle.belongsTo(db.Impuesto,{
  foreignKey: 'IVA'
})

//VISITA
db.Vendedor.hasMany(db.Visita,{
  foreignKey: 'VendedorId'
})
db.Visita.belongsTo(db.Vendedor,{
  foreignKey: 'VendedorId'
})

//VISITA
db.Proveedor.hasMany(db.Visita,{
  foreignKey: 'ProveedorId'
})
db.Visita.belongsTo(db.Proveedor,{
  foreignKey: 'ProveedorId'
})



//*******CONDOMINIO*******
//Lote
db.TipoLote.hasMany(db.Lote,{
  foreignKey: 'TipoLoteId'
})
db.Lote.belongsTo(db.TipoLote,{
  foreignKey: 'TipoLoteId'
})

db.Lote.belongsToMany(db.Persona, {
  through: "LotesPersonas",
  as:"LotePersona",
  foreignKey: "LoteId",
  otherKey: "PersonaId"
});
db.Persona.belongsToMany(db.Lote, {
  through: "LotesPersonas",
  as:"LotePersona",
  foreignKey: "PersonaId",
  otherKey: "LoteId"
});


//Persona
db.TipoPersona.hasMany(db.Persona,{
  foreignKey: 'TipoPersonaId'
})
db.Persona.belongsTo(db.TipoPersona,{
  foreignKey: 'TipoPersonaId'
})

