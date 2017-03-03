/**
 * Agarre.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    idUsuario:{
      model:'Usuario',
      required:true
    },
    nombre:{
      type:'string',
      required:true
    },
    veces:{
      type:'integer',
      required:true
    },
    dineroGastado:{
      type:'float',
      required:true
    }
  }
};

