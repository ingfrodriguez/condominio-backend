const index = require("../models/index.js");
const { UnidadMedida } = require("../models");
const db = require("../models");
const TipoIngreso = db.TipoIngreso;
const Ingreso = db.Ingreso;
const IngresoDetalle = db.IngresoDetalle;
const Op = db.Sequelize.Op;
const Producto = db.Producto;


//-------OPERACIONES-------

exports.IngresoInventario = async (req, res) => {
  const reqingreso=JSON.parse( req.query.Ingreso)
  const t = await db.sequelize.transaction();
  try {
    const ingreso = await Ingreso.create({
      SerieNumero: reqingreso.SerieNumero,
      FacturaNumero: reqingreso.FacturaNumero,
      ProveedorId: reqingreso.ProveedorId,
      TipoIngresoId: reqingreso.TipoIngresoId,
      Notas: reqingreso.Notas,
      Documento: reqingreso.Documento,
      UsuarioCreo:req.userId
    }, { transaction: t });
        
    function detalle() {
      return new Promise(function(resolve, reject) {
        req.query.IngresoDetalle.forEach( async function(producto, indice, array){
          producto=JSON.parse( producto)
          if(producto.ProductoId && producto.Cantidad>0){
            await IngresoDetalle.create({
              Cantidad:producto.Cantidad,
              CostoUnitario:producto.CostoUnitario,
              CostoTotal:producto.CostoTotal,
              ProductoId:producto.ProductoId,
              IngresoId:ingreso.id,
              IVA: IVA
            }, { transaction: t }).catch(err => {
              reject(err);
            });
            if (indice === array.length - 1){
              resolve();
            }  
          }
        })
      })
    }

    detalle().then(r =>{
      console.log('todo bien');
      console.log('***'+ingreso.id);
      t.commit();
      res.send({ message: "Ingreso hecho!",id:ingreso.id});
    }).catch((error) => {
      console.log('Algo salió mal');
      t.rollback();
      res.status(500).send({ message: error.message });
    });
    
    
    
  }
  catch (error) {
    console.log('errorrr')
    res.status(500).send({ message: error.message });
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
  
  }
  
};


exports.CrearTipoIngreso = (req, res) => {
  TipoIngreso.create({
    Nombre: req.body.Nombre,
  })
    .then(producto => {
      res.send({ message: "Tipo Ingreso Creada!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.ListarTiposIngreso = (req, res) => {
  TipoIngreso.findAll()
  .then(tipos => {
    res.json(tipos);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.ListarIngresos = (req, res) => {
  var moment = require('moment');  
  var x=req.query.Correlativo ?  req.query.Correlativo:null
  Ingreso.findAll({ 
    where : {
      [Op.or]: [{id:x},db.sequelize.literal(x+' isnull')],
      FechaIngreso:  {
        [Op.between]:
          [
            req.query.Del ? req.query.Del: FechaInicioSistema
            ,req.query.Al ? req.query.Al: moment().toDate()
          ]
      }
    },
    limit:50,
    order:[['FechaIngreso', 'DESC']],
    include: { model: TipoIngreso}
  })
  .then(ingresos => {
    res.json(ingresos);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.VerIngreso = (req, res) => {  
  Ingreso.findByPk(req.query.id,{
    include: { 
      model: IngresoDetalle,
      include:[{
        model:Producto,
        include:[UnidadMedida]
      }]
    }
  })
    .then(producto => {
      res.json(producto);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}