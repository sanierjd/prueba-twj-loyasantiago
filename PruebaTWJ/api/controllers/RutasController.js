/**
 * RutasController
 *
 * @description :: Server-side logic for managing rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function (req, res) {
    // res.view(String: Nombre vista, Datos JSON)
    return res.view('usuario/Home', {
      titulo: 'Inicio',
      title: 'Inicio',

    })
  },
  crearUsuario: function (req, res) {
    return res.view('usuario/crearUsuario', {
      title: 'Crear Usuario'
    })
  },
  editarUsuario: function (req, res) {

    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.id) {

      Usuario.findOne({
        id: parametros.id
      }).exec(function (error, usuarioEncontrado) {
        if (error) return res.serverError()
        return res.view('usuario/editarUsuario', {
          title: 'Editar usuario - ' + usuarioEncontrado.nombre,
          Usuario: usuarioEncontrado
        })
      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID'
        }
      });
    }
  },
  listarUsuarios: function (req, res) {

    Usuario.find().exec(function (error, usuariosEncontrados) {
      if (error) return res.serverError()
      sails.log.info(usuariosEncontrados);
      return res.view('usuario/listarUsuarios', {
        title: 'Lista de Usuarios',
        Usuario: usuariosEncontrados
      })
    });
  },
  crearAgarre: function (req, res) {

    var parametros = req.allParams();
    console.log('parametros que llegan a crear un agarre',parametros);
    if (parametros.id) {

      Usuario.findOne({
        id: parametros.id
      }).exec(function (error, usuarioEncontrado) {
        console.log('encontro este usuario',usuarioEncontrado)
        if (error) return res.serverError()
        return res.view('agarre/crearAgarre', {
          title: 'crear agarre de  usuario - ' + usuarioEncontrado.nombre,
          Usuario: usuarioEncontrado
        })
      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID'
        }
      });
    }
  },
  editarAgarre: function (req, res) {

    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.id) {

      Agarre.findOne({
        id: parametros.id
      }).exec(function (error, usuarioEncontrado) {
        if (error) return res.serverError()
        return res.view('agarre/editarAgarre', {
          title: 'Editar agarre - ' + usuarioEncontrado.nombre,
          Agarre: usuarioEncontrado
        })
      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID'
        }
      });
    }
  },
  listarAgarres: function (req, res) {

    Agarre.find().exec(function (error, usuariosEncontrados) {
      if (error) return res.serverError()
      sails.log.info(usuariosEncontrados);
      return res.view('agarre/listarAgarres', {
        title: 'Lista de Agarres',
        Agarre: usuariosEncontrados
      })
    });
  }

};

