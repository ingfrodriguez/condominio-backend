
const controller = require("../controllers/producto.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/CrearProducto",[authJwt.verifyToken, authJwt.isAdmin], controller.CrearProducto);
  app.post("/api/ModificarProducto",[authJwt.verifyToken, authJwt.isAdmin], controller.ModificarProducto);
  app.get("/api/ListarProductos",[authJwt.verifyToken, authJwt.isAdmin],controller.ListarProductos);
  app.get("/api/VerProducto",[authJwt.verifyToken, authJwt.isAdmin], controller.VerProducto);
  app.get("/api/VerProductoCorto",[authJwt.verifyToken, authJwt.isAdmin], controller.VerProductoCorto);

  app.get("/api/ListarUnidadesMedidas",[authJwt.verifyToken, authJwt.isAdmin],controller.ListarUnidadesMedidas);

  app.post("/api/CrearCategoriaProducto", [authJwt.verifyToken, authJwt.isAdmin],controller.CrearCategoriaProducto);
  app.get("/api/ListarCategoriaProducto",[authJwt.verifyToken, authJwt.isAdmin],controller.ListarCategoriaProducto);
  app.delete("/api/BorrarCategoriaProducto",[authJwt.verifyToken, authJwt.isAdmin], controller.BorrarCategoriaProducto);
  app.post("/api/ModificarCategoriaProducto",[authJwt.verifyToken, authJwt.isAdmin], controller.ModificarCategoriaProducto);

}; 