
const controller = require("../controllers/Reporte.controller");
const { authJwt } = require("../middleware");
 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/kardexdownload/:name", controller.KardexDownload);
  app.get("/api/kardex",[authJwt.verifyToken, authJwt.isAdmin], controller.Kardex);
  app.get("/api/topVentas",[authJwt.verifyToken, authJwt.isAdmin], controller.TopVentas);
}; 