/**
 * AgarreController
 *
 * @description :: Server-side logic for managing agarres
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearAgarre:function (req,res) {

    var parametros = req.allParams();
    console.log(parametros);
    console.log('Metodo:', req.method);
    if (req.method == 'POST') {
      if (parametros.nombre && parametros.veces && parametros.idUsuario && parametros.dineroGastado) {
        //creo el usuario
        console.log('Va a crear el agarre.')
        Agarre.create({
          nombre: parametros.nombre,
          veces: parametros.veces,
          idUsuario: parametros.idUsuario,
          dineroGastado:parametros.dineroGastado
        }).exec(function (error, usuarioCreado) {
          if (error) {
            return res.view('error', {
              title: 'Error',
              error: {
                descripcion: 'hubo un error enviando los parametros:',

                url: '/crearAgarre'
              }
            });
          }
          sails.log.info('Se creo el agarre: ', usuarioCreado);

          Agarre.find().populate('idUsuario').exec(function (error, usuariosEncontrados) {
            if (error) return res.serverError()
            sails.log.info(usuariosEncontrados);
            return res.view('agarre/listarAgarres', {
              title: 'Lista de Agarres',
              Agarre: usuariosEncontrados
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
            url: '/crearAgarre'
          }
        });
      }
    } else {
      console.log('POST');
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearAgarre'
        }
      });
    }
  },
  editarAgarre: function (req, res) {

    var parametros = req.allParams();
    if (req.method == 'POST') {
      sails.log.error('parametros',parametros)
      if (parametros.nombre && parametros.veces && parametros.dineroGastado) {
        console.log('Va a actualizar el usuario. con estos paramentro', parametros)
        Agarre.update({
          id: parametros.id
        }, {
          nombre: parametros.nombre,
          veces: parametros.veces,
          dineroGastado: parametros.dineroGastado
        }).exec(function (error, usuarioCreado) {
          if (error) {
            return res.view('error', {
              title: 'Error',
              error: {
                descripcion: 'hubo un error enviando los parametros:',

                url: '/crearAgarre'
              }
            });
          }
          sails.log.info('Se actualizo el usuario: ', usuarioCreado);

          Agarre.find().populate('idUsuario').exec(function (error, usuariosEncontrados) {
            if (error) return res.serverError()
            sails.log.info(usuariosEncontrados);
            return res.view('agarre/listarAgarres', {
              title: 'Lista de Usuarios',
              Agarre: usuariosEncontrados
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
            url: '/crearAgarre'
          }
        });
      }
    } else {
      console.log('POST');
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearAgarre'
        }
      });
    }

  },
  BorrarAgarre: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Agarre.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, UsuarioRemovido) {
        if (errorInesperado) {
          return res.view('error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/listarAgarres"
            }
          });
        }
        Agarre.find()
          .exec(function (errorIndefinido, usuariosEncontrados) {

            if (errorIndefinido) {
              res.view('error', {
                error: {
                  descripcion: "Hubo un problema cargando los Usuarios",
                  rawError: errorIndefinido,
                  url: "/listarAgarres"
                }
              });
            }

            res.view('agarre/listarAgarres', {
              Agarre: usuariosEncontrados
            });
          })
      })

    } else {
      return res.view('error', {
        error: {
          descripcion: "Necesitamos el ID para borrar al Usuario",
          rawError: "No envia ID",
          url: "/listarAgarres"
        }
      });
    }
  }

};

