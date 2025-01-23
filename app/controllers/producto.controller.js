const { UnidadMedida } = require("../models/Index");
const db = require("../models/Index");
const Producto = db.Producto;
const CategoriaProducto = db.CategoriaProducto;

//-------Producto OPERACIONES-------
exports.CrearProducto = (req, res) => {
  Producto.create({
    Codigo: req.body.Codigo,
    Nombre: req.body.Nombre,
    Descripcion: req.body.Descripcion,
    CategoriaProductoId: req.body.CategoriaProductoId,
    UnidadMedidaId: req.body.UnidadMedidaId,
    UsuarioCreo: req.userId
  })
    .then(producto => {
      res.send({ message: "Producto Creado!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.ListarProductos = (req, res) => {
  Producto.findAll({
    include: { all: true }
  })
    .then(producto => {
      res.json(producto);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}
exports.VerProducto = (req, res) => {
  Producto.findByPk(req.query.id, {
    include: { all: true }
  })
    .then(producto => {
      res.json(producto);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

exports.VerProductoCorto = (req, res) => {
  Producto.findOne({ 
    where: { Codigo: req.query.Codigo }, 
    include: { model: UnidadMedida}
  })
    .then(producto => {
      console.log(producto)
      res.json(producto);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}
exports.ModificarProducto = (req, res) => {
  db.Producto.update({
    Activo: req.body.Activo,
    Nombre: req.body.Nombre,
    Descripcion: req.body.Descripcion,
    CategoriaProductoId: req.body.CategoriaProductoId,
    UnidadMedidaId: req.body.UnidadMedidaId,
    UsuarioModifico: req.userId
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(function () {
      res.send('Modificado')
    }
    )
    .catch(
      err => {
        res.status(500).send({ message: err.message });
      });
};
//-------UnidadMedida OPERACIONES-------
exports.ListarUnidadesMedidas = (req, res) => {
  UnidadMedida.findAll()
    .then(unidadmedida => {
      res.json(unidadmedida);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
}

//-------CategoriaProducto OPERACIONES-------
exports.CrearCategoriaProducto = (req, res) => {
  CategoriaProducto.create({
    Nombre: req.body.Nombre,
  })
    .then(CategoriaProducto => {
      res.send({ message: "CategoriaProducto Creada" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.ListarCategoriaProducto = (req, res) => {
  db.CategoriaProducto.findAll()
    .then(role => {
      res.json(role);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });;
};

exports.BorrarCategoriaProducto = (req, res) => {

  db.CategoriaProducto.destroy(
    {
      where: {
        id: req.body.Id
      }
    }
  )
    .then(function () {
      res.send('Borrado')
    })
    .catch(
      err => {
        res.status(500).send({ message: err.message });
      });
};

exports.ModificarCategoriaProducto = (req, res) => {
  db.CategoriaProducto.update({
    Nombre: req.body.Nombre
  }, {
    where: {
      id: req.body.Id
    }
  })
    .then(function () {
      res.send('Modificado')
    }
    )
    .catch(
      err => {
        res.status(500).send({ message: err.message });
      });
};
//Fin CategoriaProducto OPERACIONES