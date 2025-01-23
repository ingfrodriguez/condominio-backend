const db = require("../models");
const Proveedor = db.Proveedor;
const CategoriaProveedor = db.CategoriaProveedor;
const Contacto = db.Contacto;
const Op = db.Sequelize.Op;

//-------Proveedor OPERACIONES-------
exports.CrearProveedor = (req, res) => {
  Proveedor.create({
    NIT: req.body.Proveedor.NIT,
    RazonSocial: req.body.Proveedor.RazonSocial,
    DireccionComercial: req.body.Proveedor.DireccionComercial,
    Nombre: req.body.Proveedor.Nombre,
    Email: req.body.Proveedor.Email,
    ManejaCredito: req.body.Proveedor.ManejaCredito,
    Comentarios: req.body.Proveedor.Comentarios,
    TelefonoPrincipal: req.body.Proveedor.TelefonoPrincipal,
    HorarioLaboral: req.body.Proveedor.HorarioLaboral,
    UsuarioCreo:req.userId
  })
    .then(proveedorx => {
      CategoriaProveedor.findAll({
        where: {
          id: {
            [Op.or]:req.body.Proveedor.categoriasproveedor
          }
        }
      })
      .then(categorias => {
        if(req.body.Proveedor.categoriasproveedor.length>0)
          proveedorx.setCategoriaAsignadaProveedor(categorias).then(() => {
          })
      })
      .then(() => {
        req.body.Contactos.forEach(contacto => {
          Contacto.create({
            Nombre: contacto.Nombre,
            Telefono: contacto.Telefono,
            Email: contacto.Email,
            Notas: contacto.Notas,
            ProveedorId: proveedorx.id
          }).then(
          )
        })
        res.send({ message: "Proveedor Creado!" });
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.VerProveedor = (req, res) => {
  Proveedor.findByPk(req.query.id,{
    include: { all: true }
  })
    .then(proveedor => {
      res.json(proveedor);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

exports.EditarProveedor = (req, res) => {
  Proveedor.update({
    NIT: req.body.Proveedor.NIT,
    RazonSocial: req.body.Proveedor.RazonSocial,
    DireccionComercial: req.body.Proveedor.DireccionComercial,
    Nombre: req.body.Proveedor.Nombre,
    Email: req.body.Proveedor.Email,
    ManejaCredito: req.body.Proveedor.ManejaCredito,
    Comentarios: req.body.Proveedor.Comentarios,
    TelefonoPrincipal: req.body.Proveedor.TelefonoPrincipal,
    HorarioLaboral: req.body.Proveedor.HorarioLaboral,
    UsuarioModifico:req.userId
  }, {
    where: {
      NIT: req.body.Proveedor.NIT
    }
  })
  .then(() => {
    Proveedor.findOne({
      where: {
        NIT: req.body.Proveedor.NIT
    }
    })
    .then( async proveedor => {
      CategoriaProveedor.findAll({
        where: {
          id: {
            [Op.or]:req.body.Proveedor.categoriasproveedor
          }
        }
      })
      .then(async categorias => {
        if(req.body.Proveedor.categoriasproveedor.length>0){
          //await proveedor.removeCategoriaAsignadaProveedor(categorias).then(() => {console.log('quito')})
          await proveedor.setCategoriaAsignadaProveedor(categorias).then(() => {})
        }
      })
      
      
    
      await Contacto.destroy({
        where: {
          ProveedorId: proveedor.id
        }
      }).then(()=>{
      })
      await req.body.Contactos.forEach(contacto => {
        Contacto.create({
          Nombre: contacto.Nombre,
          Telefono: contacto.Telefono,
          Email: contacto.Email,
          Notas: contacto.Notas,
          ProveedorId: proveedor.id
        }).then(
         
        )
      })
    


      
      
    })
    .then(() => {
      //proveedor.removeContactos();
      
      
      
      res.send({ message: "Proveedor Editado!" });
    })
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
    

exports.ListarProveedores = (req, res) => {
  Proveedor.findAll({
    include: { all: true }
  })
    .then(proveedores => {
      res.json(proveedores);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

exports.ListarProveedoresSinInclude = (req, res) => {
  Proveedor.findAll()
    .then(proveedores => {
      res.json(proveedores);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}


//CATEGORIAS PROVEEDORES
exports.CrearCategoriaProveedor = (req, res) => {
  CategoriaProveedor.create({
    Nombre: req.body.Nombre,
  })
    .then(producto => {
      res.send({ message: "Categoria Proveedor Creada!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.ModificarCategoriaProveedor = (req, res) => {
  db.CategoriaProveedor.update({
    Nombre: req.body.Nombre
  }, {
    where: {
      id: req.body.Id
    }
  })
    .then(function () {
      res.send('CategoriaProveedor Modificado')
    }
    )
    .catch(
      err => {
        res.status(500).send({ message: err.message });
      });
};
exports.ListarCategoriasProveedores = (req, res) => {
  CategoriaProveedor.findAll()
    .then(categorias => {
      res.json(categorias);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

