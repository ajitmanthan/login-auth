const mon = require('mongoose')

let a = new mon.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String ,
        required:true
    },
    username:{
        type:String ,
        required:true
    }
})

let b = mon.model('1',a)

module.exports = b