const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Log = db.define('Log' , {
    date: {
        type: DataTypes.DATEONLY ,
        allowNull : false ,
        require: true,
    },
    type: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    description: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },


})


module.exports = Log














//===================================================
//Log:
	//-date: data da atividade
	//-type: tipo de atividade, dentre as opções:
      //	(a) user register
      //	(b) user deletion
      //	(c) user update
      //	(d) login
      //	(e) logout
      //	(f) course payment solicitation
      //	(g) course payment
      //	(h) course unsubscribe
      //	(i) course acess liberation
      //(j) course acess block
	//-description: descrição breve do que aconteceu