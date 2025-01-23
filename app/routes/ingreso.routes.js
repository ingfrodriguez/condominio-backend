
const controller = require("../controllers/Ingreso.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/IngresoInventario",[authJwt.verifyToken, authJwt.isAdmin], controller.IngresoInventario);
  app.get("/api/ListarVendedores",[authJwt.verifyToken], controller.CrearTipoIngreso);
  app.get("/api/ListarTiposIngreso", controller.ListarTiposIngreso);
  app.get("/api/ListarIngresos",[authJwt.verifyToken, authJwt.isAdmin], controller.ListarIngresos);
  app.get("/api/VerIngreso",[authJwt.verifyToken, authJwt.isAdmin], controller.VerIngreso);
  


}; 