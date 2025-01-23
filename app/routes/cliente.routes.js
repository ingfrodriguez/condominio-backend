
const controller = require("../controllers/Cliente.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/CrearCliente",[authJwt.verifyToken, authJwt.isAdmin], controller.CrearCliente); 
  app.post("/api/ModificarCliente",[authJwt.verifyToken, authJwt.isAdmin], controller.ModificarCliente); 
  app.get("/api/ListarClientes",[authJwt.verifyToken], controller.ListarClientes);
  app.get("/api/ListarClientesSinInclude",[authJwt.verifyToken], controller.ListarClientesSinInclude);
  app.get("/api/VerCliente",[authJwt.verifyToken], controller.VerCliente);


}; 