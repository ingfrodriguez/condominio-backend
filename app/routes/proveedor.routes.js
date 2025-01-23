
const controller = require("../controllers/Proveedor.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/EditarProveedor",[authJwt.verifyToken], controller.EditarProveedor);
  app.get("/api/VerProveedor",[authJwt.verifyToken], controller.VerProveedor);
  app.post("/api/CrearProveedor",[authJwt.verifyToken, authJwt.isAdmin], controller.CrearProveedor);
  app.get("/api/ListarProveedores",[authJwt.verifyToken, authJwt.isAdmin], controller.ListarProveedores);
  app.get("/api/ListarProveedoresSinInclude",[authJwt.verifyToken], controller.ListarProveedoresSinInclude);
  app.post("/api/CrearCategoriaProveedor",[authJwt.verifyToken, authJwt.isAdmin], controller.CrearCategoriaProveedor);
  app.post("/api/ModificarCategoriaProveedor",[authJwt.verifyToken, authJwt.isAdmin], controller.ModificarCategoriaProveedor);
  app.get("/api/ListarCategoriasProveedores",[authJwt.verifyToken], controller.ListarCategoriasProveedores); 

}; 