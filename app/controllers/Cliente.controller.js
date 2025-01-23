const db = require("../models");
const Cliente = db.Cliente;
const CategoriaProveedor = db.CategoriaProveedor;
const Contacto = db.Contacto;
const Op = db.Sequelize.Op;

//-------Cliente OPERACIONES-------
exports.CrearCliente = (req, res) => {
  Cliente.create({
    NIT: req.body.Cliente.NIT,
    RazonSocial: req.body.Cliente.RazonSocial,
    DireccionComercial: req.body.Cliente.DireccionComercial,
    Nombre: req.body.Cliente.Nombre,
    Email: req.body.Cliente.Email,
    Credito: req.body.Cliente.Credito,
    Valoracion: req.body.Cliente.Valoracion,
    DireccionEntrega: req.body.Cliente.DireccionEntrega,
    Comentarios: req.body.Cliente.Comentarios,
    TelefonoPrincipal: req.body.Cliente.TelefonoPrincipal,
    HorarioLaboral: req.body.Cliente.HorarioLaboral,
    VendedorId: req.body.Cliente.VendedorId,
    UsuarioCreo:req.userId
  })
    .then(clientex => {
      CategoriaProveedor.findAll({
        where: {
          id: {
            [Op.or]:req.body.Cliente.categoriascliente
          }
        }
      })
      .then(categorias => {
        if(req.body.Cliente.categoriascliente.length>0)
        clientex.setCategoriaAsignadaCliente(categorias).then(() => {
          })
      })
      .then(() => {
        req.body.Contactos.forEach(contacto => {
          Contacto.create({
            Nombre: contacto.Nombre,
            Telefono: contacto.Telefono,
            Email: contacto.Email,
            Notas: contacto.Notas,
            ClienteId: clientex.id
          }).then(
          )
        })
        res.send({ message: "Cliente Creado!" });
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.VerCliente = (req, res) => {
  Cliente.findByPk(req.query.id,{
    include: { all: true }
  })
    .then(cliente => {
      res.json(cliente);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

exports.ModificarCliente = (req, res) => {
  Cliente.update({
    NIT: req.body.Cliente.NIT,
    RazonSocial: req.body.Cliente.RazonSocial,
    DireccionComercial: req.body.Cliente.DireccionComercial,
    Nombre: req.body.Cliente.Nombre,
    Email: req.body.Cliente.Email,
    Credito: req.body.Cliente.Credito,
    Valoracion: req.body.Cliente.Valoracion,
    DireccionEntrega: req.body.Cliente.DireccionEntrega,
    Comentarios: req.body.Cliente.Comentarios,
    TelefonoPrincipal: req.body.Cliente.TelefonoPrincipal,
    HorarioLaboral: req.body.Cliente.HorarioLaboral,
    VendedorId: req.body.Cliente.VendedorId,
    UsuarioModifico:req.userId
  }, {
    where: {
      NIT: req.body.Cliente.NIT
    }
  })
  .then(() => {
    Cliente.findOne({
      where: {
        NIT: req.body.Cliente.NIT
    }
    })
    .then( async cliente => {
      CategoriaProveedor.findAll({
        where: {
          id: {
            [Op.or]:req.body.Cliente.categoriascliente
          }
        }
      })
      .then(async categorias => {
        if(req.body.Cliente.categoriascliente.length>0){
          await cliente.setCategoriaAsignadaCliente(categorias).then(() => {})
        }
      })
      
      
    
      await Contacto.destroy({
        where: {
          ClienteId: cliente.id
        }
      }).then(()=>{
      })
      await req.body.Contactos.forEach(contacto => {
        Contacto.create({
          Nombre: contacto.Nombre,
          Telefono: contacto.Telefono,
          Email: contacto.Email,
          Notas: contacto.Notas,
          ClienteId: cliente.id
        }).then(
         
        )
      })      
      
    })
    .then(() => {
      
      
      res.send({ message: "Cliente Editado!" });
    })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
    

exports.ListarClientes = (req, res) => {
  Cliente.findAll({
    include: { all: true }
  })
    .then(clientes => {
      res.json(clientes);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

exports.ListarClientesSinInclude = (req, res) => {
  Cliente.findAll()
    .then(clientes => {
      res.json(clientes);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}
