
const controller = require("../controllers/Vendedor.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/CrearVendedor",[authJwt.verifyToken, authJwt.isAdmin], controller.CrearVendedor);
  app.post("/api/ModificarVendedor",[authJwt.verifyToken, authJwt.isAdmin], controller.ModificarVendedor);
  app.get("/api/VerVendedor",[authJwt.verifyToken, authJwt.isAdmin], controller.VerVendedor);
  app.get("/api/ListarVendedores",[authJwt.verifyToken], controller.ListarVendedores);
  app.post("/api/CrearVisita",[authJwt.verifyToken], controller.CrearVisita);
  app.get("/api/ListarVisitas",[authJwt.verifyToken], controller.ListarVisitas);


}; 