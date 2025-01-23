const express = require("express");
const cors = require("cors");
const app = express();
global.IVA = 12; //12%
global.FechaInicioSistema = "2021-01-01";
var morganBody = require("morgan-body");
var bodyParser = require("body-parser");
global.__basedir = __dirname;
//var corsOptions = {
//origin: "http://localhost:8081"
//};

require("winston-daily-rotate-file");
const winston = require("winston");



var transport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: 'app/resources/log/headers-%DATE%.log',
  datePattern: 'DD-MM-YYYY',//'YYYY-MM-DD-HH' , ORIGINAL
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '100d'
});


const logger = winston.createLogger({
level: 'info',
format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple()
),
transports: [
  new winston.transports.Console(),
  transport
],
});

const loggerStream = {
  write: (message) => {
    logger.info(message);
  },
};

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  logAllResHeader:true,
  maxBodyLength:100000
});

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:8081",
      "http://localhost:8100",
      "http://192.168.1.13:3000",
      "http://192.168.2.103:3000",
      "http://192.168.2.103:8100",
      "http://localhost:3000",
    ],
  })
);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  // Using Date() method
  var d = Date();

  // Converting the number value to string
  a = d.toString();
  res.json({ message: "Welcome to Fredy application. Working at: " + a });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/vendedor.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/ingreso.routes")(app);
require("./app/routes/salida.routes")(app);
require("./app/routes/reporte.routes")(app);
require("./app/routes/file.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const { UnidadMedida, CategoriaProducto, Impuesto } = require("./app/models");
const Role = db.role;
const CategoriaProveedor = db.CategoriaProveedor;
const TipoIngreso = db.TipoIngreso;
const TipoSalida = db.TipoSalida;
const Proveedor = db.Proveedor;

db.sequelize.sync({ force: true }).then(() => {
  initial();
  console.log(
    "------------------------------------Sincronizado------------------------------------"
  );
});

function initial() {
  //ROLES
  Role.create({
    id: 1,
    name: "superadmin",
  });
  Role.create({
    id: 2,
    name: "admin",
  });
  Role.create({
    id: 3,
    name: "ventas",
  });

  //UNIDADES DE MEDIDA
  UnidadMedida.create({
    Nombre: "Unidad",
    Abreviatura: "U",
  });
  UnidadMedida.create({
    Nombre: "Metro",
    Abreviatura: "Mt",
  });
  UnidadMedida.create({
    Nombre: "Centimetro",
    Abreviatura: "Cm",
  });
  UnidadMedida.create({
    Nombre: "Milimetro",
    Abreviatura: "Mm",
  });
  UnidadMedida.create({
    Nombre: "Litro",
    Abreviatura: "Lt",
  });

  //CATEGORIAS PRODUCTOS
  CategoriaProducto.create({
    Nombre: "Mangueras",
  });

  //CATEGORIAS PROVEDORES
  CategoriaProveedor.create({
    Nombre: "Sellos Hidraulicos",
  });
  CategoriaProveedor.create({
    Nombre: "Ferreterías",
  });
  CategoriaProveedor.create({
    Nombre: "Material Industrial",
  });
  CategoriaProveedor.create({
    Nombre: "Venta de repuestos X",
  });

  //TIPO INGRESO
  TipoIngreso.create({
    Nombre: "Compras",
  });
  TipoIngreso.create({
    Nombre: "Ajuste Entrada",
  });
  TipoIngreso.create({
    Nombre: "Regalia",
  });
  TipoIngreso.create({
    Nombre: "Consignación",
  });
  TipoIngreso.create({
    Nombre: "Traslado de bodega",
  });

  //IMPUESTOS
  Impuesto.create({
    id: 12,
    Nombre: "IVA",
    Porcentaje: 0.12,
  });

  //Proveedor
  Proveedor.create({
    NIT: 0,
    RazonSocial: "Sin Proveedor",
    DireccionComercial: "Sin Direccion",
    Nombre: "Sin Proveedor",
  });

  //TIPO SALIDA
  TipoSalida.create({
    Nombre: "Venta",
  });
  TipoSalida.create({
    Nombre: "Ajuste de Salida",
  });


  //*******CONDOMINIO*******
  //LOTE

}
