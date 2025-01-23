
const controller = require("../controllers/Salida.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/SalidaInventario",[authJwt.verifyToken, authJwt.isAdmin], controller.SalidaInventario);
  app.get("/api/ListarTiposSalida",[authJwt.verifyToken, authJwt.isAdmin], controller.ListarTiposSalida);
  app.get("/api/ListarSalidas",[authJwt.verifyToken, authJwt.isAdmin], controller.ListarSalidas);
  app.get("/api/VerSalida",[authJwt.verifyToken, authJwt.isAdmin], controller.VerSalida);

}; 