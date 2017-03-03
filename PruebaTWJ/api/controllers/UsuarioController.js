/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearUsuario:function (req,res) {
    var parametros = req.allParams();
    console.log(parametros);
    console.log('Metodo:', req.method);
    if (req.method == 'POST') {
      if (parametros.nombre && parametros.preferencia && parametros.fechaNacimiento) {
        console.log('Va a crear el usuario.')
        Usuario.create({
          nombre: parametros.nombre ,
          preferencia: parametros.preferencia,
          fechaNacimiento: parametros.fechaNacimiento
        }).exec(function (error, usuarioCreado) {
          if (error) {
            return res.view('error', {
              title: 'Error',
              error: {
                descripcion: 'Hubo un error enviando los parametros:',
                url: '/crearUsuario'
              }
            });
          }
          sails.log.info('Se creo el usuario: ', usuarioCreado);

          Usuario.find().exec(function (error, usuariosEncontrados) {
            if (error) return res.serverError()
            sails.log.info(usuariosEncontrados);
            return res.view('usuario/listarUsuarios', {
              title: 'Lista de Usuarios',
              Usuario: usuariosEncontrados
            })
          });
        });

      } else {
        // bad Request
        console.log('NO PARAMETROS');
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envia todos los parametros',
            url: '/crearUsuario'
          }
        });
      }
    } else {
      console.log('POST');
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearUsuario'
        }
      });
    }
  },
  editarUsuario: function (req, res) {

    var parametros = req.allParams();
    if (req.method == 'POST') {
      if (parametros.nombre && parametros.preferencia && parametros.id&& parametros.fechaNacimiento) {
        //creo el usuario
        console.log('Va a actualizar el usuario.')
        Usuario.update({
          id: parametros.id
        }, {
          nombre: parametros.nombre,
          preferencia: parametros.preferencia,
          fechaNacimiento: parametros.fechaNacimiento
        }).exec(function (error, usuarioCreado) {
          if (error) {
            return res.view('error', {
              title: 'Error',
              error: {
                descripcion: 'hubo un error enviando los parametros:',

                url: '/crearUsuario'
              }
            });
          }
          sails.log.info('Se actualizo el usuario: ', usuarioCreado);

          Usuario.find().exec(function (error, usuariosEncontrados) {
            if (error) return res.serverError()
            sails.log.info(usuariosEncontrados);
            return res.view('usuario/listarUsuarios', {
              title: 'Lista de Usuarios',
              Usuario: usuariosEncontrados
            })
          });

        });

      } else {
        // bad Request
        console.log('NO PARAMETROS');
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envia todos los parametros',
            url: '/crearUsuario'
          }
        });
      }
    } else {
      console.log('POST');
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearUsuario'
        }
      });
    }

  },
  BorrarUsuario: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Usuario.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, UsuarioRemovido) {
        if (errorInesperado) {
          return res.view('error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/listarUsuarios"
            }
          });
        }
        Usuario.find()
          .exec(function (errorIndefinido, usuariosEncontrados) {

            if (errorIndefinido) {
              res.view('error', {
                error: {
                  descripcion: "Hubo un problema cargando los Usuarios",
                  rawError: errorIndefinido,
                  url: "/listarUsuarios"
                }
              });
            }

            res.view('usuario/listarUsuarios', {
              Usuario: usuariosEncontrados
            });
          })
      })

    } else {
      return res.view('error', {
        error: {
          descripcion: "Necesitamos el ID para borrar al Usuario",
          rawError: "No envia ID",
          url: "/listarUsuarios"
        }
      });
    }
  }

};

