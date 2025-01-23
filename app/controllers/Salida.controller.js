const { UnidadMedida } = require("../models");
const db = require("../models");
const TipoSalida = db.TipoSalida;
const Salida = db.Salida;
const SalidaDetalle = db.SalidaDetalle;
const Op = db.Sequelize.Op;
const Producto = db.Producto;


//-------OPERACIONES-------

exports.SalidaInventario = async (req, res) => {
  const reqsalida=JSON.parse( req.query.Salida)
  console.log(reqsalida)
  const t = await db.sequelize.transaction();
  try {
    const salida = await Salida.create({
      SerieNumero: reqsalida.SerieNumero,
      FacturaNumero: reqsalida.FacturaNumero,
      ClienteId: reqsalida.ClienteId,
      TipoSalidaId: reqsalida.TipoSalidaId,
      VendedorId: reqsalida.VendedorId,
      Documento: reqsalida.Documento,
      Notas: reqsalida.Notas,
      UsuarioCreo:req.userId
    }, { transaction: t });
        
    function detalle() {
      return new Promise(function(resolve, reject) {
        req.query.SalidaDetalle.forEach( async function(producto, indice, array){
          producto=JSON.parse( producto)
          if(producto.ProductoId && producto.Cantidad>0){
            await SalidaDetalle.create({
              Cantidad:producto.Cantidad,
              CostoUnitario:producto.CostoUnitario,
              CostoTotal:producto.CostoTotal,
              ProductoId:producto.ProductoId,
              SalidaId:salida.id,
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
      t.commit();
      res.send({ message: "Salida hecho!" });
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


exports.ListarTiposSalida = (req, res) => {
  TipoSalida.findAll()
  .then(tipos => {
    res.json(tipos);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.ListarSalidas = (req, res) => {
  var moment = require('moment');  
  var x=req.query.Correlativo ?  req.query.Correlativo:null
  Salida.findAll({ 
    where : {
      [Op.or]: [{id:x},db.sequelize.literal(x+' isnull')],
      FechaSalida:  {
        [Op.between]:
          [
            req.query.Del ? req.query.Del: FechaInicioSistema
            ,req.query.Al ? req.query.Al: moment().toDate()
          ]
      }
    },
    limit:50,
    order:[['FechaSalida', 'DESC']],
    include: { model: TipoSalida}
  })
  .then(salidas => {
    res.json(salidas);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.VerSalida = (req, res) => {
  Salida.findByPk(req.query.id,{
    include: { 
      model: SalidaDetalle,
      include:[{
        model:Producto,
        include:[UnidadMedida]
      }]
    }
  })
    .then(salida => {
      res.json(salida);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}