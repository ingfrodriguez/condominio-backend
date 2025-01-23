const db = require("../models");
const Vendedor = db.Vendedor;
const Contacto = db.Contacto;
const Visita = db.Visita;
const Op = db.Sequelize.Op;

//-------Vendedor OPERACIONES-------
exports.CrearVendedor = (req, res) => {
  Vendedor.create({ 
    Nombre: req.body.Vendedor.Nombre,
    Telefono: req.body.Vendedor.Telefono,
    Celular: req.body.Vendedor.Celular,
    Domicilio: req.body.Vendedor.Domicilio,
    Email: req.body.Vendedor.Email,
    Comentarios: req.body.Vendedor.Comentarios,
    HorarioLaboral: req.body.Vendedor.HorarioLaboral,
    ComisionAsignada: req.body.Vendedor.ComisionAsignada,
    UsuarioCreo:req.userId
  })
  .then(vendedorx => {
    req.body.Contactos.forEach(contacto => {
      Contacto.create({
        Nombre: contacto.Nombre,
        Telefono: contacto.Telefono,
        Email: contacto.Email,
        Notas: contacto.Notas,
        VendedorId: vendedorx.id
      })
      .then(
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    })
    res.send({ message: "Vendedor Creado!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.ModificarVendedor = (req, res) => {
  Vendedor.update({ 
    Nombre: req.body.Vendedor.Nombre,
    Telefono: req.body.Vendedor.Telefono,
    Celular: req.body.Vendedor.Celular,
    Domicilio: req.body.Vendedor.Domicilio,
    Email: req.body.Vendedor.Email,
    Comentarios: req.body.Vendedor.Comentarios,
    HorarioLaboral: req.body.Vendedor.HorarioLaboral,
    ComisionAsignada: req.body.Vendedor.ComisionAsignada,
    UsuarioModifico:req.userId
  }, {
    where: {
      id: req.body.Vendedor.id
    }
  })
  .then(async vendedorx => {

    Vendedor.findOne({
      where: {
        id: req.body.Vendedor.id
    }
    }).then( async vendedor => {


      await Contacto.destroy({
        where: {
          VendedorId: vendedor.id
        }
      }).then(()=>{
      })
      await req.body.Contactos.forEach(contacto => {
        Contacto.create({
          Nombre: contacto.Nombre,
          Telefono: contacto.Telefono,
          Email: contacto.Email,
          Notas: contacto.Notas,
          VendedorId: vendedor.id
        }).then(
        
        )
      })
    })

    res.send({ message: "Vendedor Creado!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.VerVendedor = (req, res) => {
  Vendedor.findByPk(req.query.id,{
    include: { all: true }
  })
    .then(vendedor => {
      res.json(vendedor);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

exports.ListarVendedores = (req, res) => {
  Vendedor.findAll({
  })
    .then(vendedores => {
      res.json(vendedores);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}



//Visitas del vendedor
exports.CrearVisita = (req, res) => {
  console.log("*------------------------------------------------------------------------------------")
  console.log(req.body.ProveedorId)
  console.log(req.userId)
  
  Visita.create({ 
    GeolocationPositionAccuracy: req.body.GeolocationPositionAccuracy,
    GeolocationPositionLatitude: req.body.GeolocationPositionLatitude,
    GeolocationPositionLongitude: req.body.GeolocationPositionLongitude,
    ProveedorId:req.body.ProveedorId,
    VendedorId:req.userId
  })
  .then(visita => {
    res.send({ message: "Visita Creada!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.ListarVisitas = (req, res) => {
  Visita.findAll({
    include: { all: true }
  })
    .then(visitas => {
      res.json(visitas);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}
