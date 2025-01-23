//const XLSX = require("xlsx"); ya no usaré este
const db = require("../models");
//const Vendedor = db.Vendedor;
const Op = db.Sequelize.Op;
const { QueryTypes } = db.Sequelize;
const Salida = db.Salida;
const TipoSalida = db.TipoSalida;
const SalidaDetalle = db.SalidaDetalle;
const Producto = db.Producto;
const excelJS = require("exceljs");

exports.KardexDownload = (req, res) => {
  console.log("entro a KardexDownload");
  const CodigoProducto = req.params.name;
  if (CodigoProducto) {
    var queryraw = this.KardexQuery(CodigoProducto);
    db.sequelize
      .query(queryraw, { type: QueryTypes.SELECT })
      .then(async (resultado) => {
        console.log(resultado);

        var Saldo = 0.0;
        var ExistenciaTotal = 0;
        for (var i = 0; i < resultado.length; i++) {
          if (resultado[i].operacion == "i") {
            Saldo += resultado[i].ingresocostototal * 1;
            ExistenciaTotal += resultado[i].ingresocantidad;
            resultado[i].saldocantidad = ExistenciaTotal;
            resultado[i].saldocostototal = Saldo.toFixed(2);
            resultado[i].saldocostounitario = (
              Saldo.toFixed(2) / ExistenciaTotal
            ).toFixed(2);
          }
          if (resultado[i].operacion == "s") {
            Saldo -= resultado[i].salidacostototal * 1;
            ExistenciaTotal -= resultado[i].salidacantidad;
            resultado[i].saldocantidad = ExistenciaTotal;
            resultado[i].saldocostototal = Saldo.toFixed(2);
            resultado[i].saldocostounitario = (
              Saldo.toFixed(2) / ExistenciaTotal
            ).toFixed(2);
          }
          resultado[i].Saldo = Saldo.toFixed(2);
        }

        const workbook = new excelJS.Workbook(); // Create a new workbook
        const worksheet = workbook.addWorksheet("Reporte", {
          pageSetup: { paperSize: 5, orientation: "landscape" },
        }); // New Worksheet

        worksheet.pageSetup.margins = {
          left: 0.1,
          right: 0,
          top: 0.75,
          bottom: 0.3,
          header: 0.0,
          footer: 0.0,
        };
        worksheet.headerFooter.oddHeader =
          "Reporte Kardex\r\nSIDISA\r\nTel: 22448866, Email: info@sidisa.com";
        worksheet.headerFooter.oddFooter = "&L&D&CSIDISA&RPage &P";
        //const path = "./files"; // Path to download excel
        const path =
          __basedir + "/app/resources/static/assets/uploads/reporte.xlsx"; // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [
          { header: "No.", key: "no", width: 5 },
          { header: "Fecha", key: "fecha", width: 12 },
          { header: "Detalle", key: "tipomovimiento", width: 25 },

          { header: "I Cantidad", key: "ingresocantidad", width: 10 },
          { header: "I C.U.", key: "ingresocostounitario", width: 15 },
          { header: "I C.T.", key: "ingresocostototal", width: 15 },

          { header: "S Cantidad", key: "salidacantidad", width: 10 },
          { header: "S C.U.", key: "salidacostounitario", width: 15 },
          { header: "S C.T.", key: "salidacostototal", width: 15 },

          { header: "T Cantidad", key: "saldocantidad", width: 10 },
          { header: "T C.P.", key: "saldocostounitario", width: 15 },
          { header: "T C.T.", key: "saldocostototal", width: 15 },
        ];
        // Looping through User data

        let counter = 1;
        resultado.forEach((item) => {
          item.no = counter;
          worksheet.addRow(item); // Add data in worksheet
          counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });

        //COLOREAMOS 
        worksheet.getColumn(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "bee5eb" },
        };
        
        worksheet.getColumn(5).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "bee5eb" },
        };        
        worksheet.getColumn(6).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "bee5eb" },
        };
        worksheet.getColumn(10).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "bee5eb" },
        };
        worksheet.getColumn(11).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "bee5eb" },
        };
        worksheet.getColumn(12).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "bee5eb" },
        };


        //bordes      
        for (let i = 1; i <= counter; i++) {
          worksheet.getRow(i).border = {
            top: {},
            left: {},
            bottom: { style: "thin", color: { argb: "000000" } },
            right: {},
          };
          
        }
        worksheet.getRow(1).border = {
          top: {},
          left: {},
          bottom: { style: "thick", color: { argb: "000000" } },
          right: {},
        };

        

        //worksheet.mergeCells("D7:E7");
        try {
          await workbook.xlsx.writeFile(`${path}`).then(() => {
            res.download(`${path}`); 
          });
        } catch (err) {
          res.send({
            status: "error",
            message: "Something went wrong, probable archivo abierto",
          });
        }
      });
  }
};

exports.KardexQuery = (CodigoProducto) => {
  var queryraw =
    `
 
    select  
    id,fecha,TipoMovimiento,CodigoProducto,Nombre,IngresoCantidad,IngresoCostoUnitario,IngresoCostoTotal,Operacion,SalidaCantidad,
	SalidaCostoUnitario,SalidaCostoTotal
    from 
    (
    select "I"."id","I"."FechaIngreso" as fecha,"TI"."Nombre" as TipoMovimiento,"P"."Codigo" as CodigoProducto, "P"."Nombre" as Nombre,
    "ID"."Cantidad" as IngresoCantidad,"ID"."CostoUnitario" as IngresoCostoUnitario,"ID"."CostoTotal" as IngresoCostoTotal,'i' as Operacion, 
	null as SalidaCantidad, null as SalidaCostoUnitario, null as SalidaCostoTotal
    from "Ingresos" as "I"
    inner join "TipoIngresos" as "TI" on "I"."TipoIngresoId"="TI"."id"
    inner join "IngresosDetalles" as "ID" on "I"."id" = "ID"."IngresoId"
    inner join "Productos" as "P" on "P"."id" = "ID"."ProductoId"


    union
    select "S"."id","S"."FechaSalida" as fecha,"TS"."Nombre" as TipoMovimiento,"P"."Codigo" as CodigoProducto, "P"."Nombre" as Nombre,
    null as IngresoCantidad,null as IngresoCostoUnitario,null as IngresoCostoTotal,'s' as Operacion,
	"SD"."Cantidad" as SalidaCantidad, "SD"."CostoUnitario" as SalidaCostoUnitario, "SD"."CostoTotal" as SalidaCostoTotal
    from "Salidas" as "S"
    inner join "TipoSalidas" as "TS" on "S"."TipoSalidaId"="TS"."id"
    inner join "SalidasDetalles" as "SD" on "S"."id" = "SD"."SalidaId"
    inner join "Productos" as "P" on "P"."id" = "SD"."ProductoId"
    ) as kardex
    Where CodigoProducto='` +
    CodigoProducto +
    `'
    order by fecha asc;

    `;
  return queryraw;
};

exports.Kardex = (req, res) => {
  if (req.query.CodigoProducto) {
    var queryraw = this.KardexQuery(req.query.CodigoProducto);
    db.sequelize
      .query(queryraw, { type: QueryTypes.SELECT })
      .then((resultado) => {
        res.json(resultado);
      });
  }
};

exports.TopVentas = (req, res) => {
  var queryraw =
    `
    select "ProductoId", p."Nombre" , sum(sd."Cantidad") as "Conteo" from "SalidasDetalles" sd 
    inner join "Salidas" s ON sd."SalidaId" = s.id
    inner join "Productos" p ON sd."ProductoId" =p.id 
    where "TipoSalidaId" =1 ` +
    (req.query.Del
      ? `and DATE(s."FechaSalida") >='` + req.query.Del + `' `
      : ``) +
    (req.query.Al
      ? `and DATE(s."FechaSalida") <='` + req.query.Al + `' `
      : ``) +
    (req.query.Categoria
      ? `and p."CategoriaProductoId" =` + req.query.Categoria
      : ``) +
    ` group by "ProductoId", p."Nombre" 
    order by sum(sd."Cantidad") desc
    limit 100`;
  db.sequelize
    .query(queryraw, { type: QueryTypes.SELECT })
    .then((resultado) => {
      console.log(JSON.stringify(resultado));
      res.json(resultado);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
