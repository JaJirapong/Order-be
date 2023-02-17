const Mongoose = require('mongoose')

const TableSchema = new Mongoose.Schema(
    {
        chair: {
            type: String
        },
        bkstatus:{
            type: Boolean
        },
        inUse:{
            type: Boolean
        }
        ,
        name:{
            type: String,
            unique: true
        }
    }
)

const Table = Mongoose.model('Table', TableSchema)
module.exports = Table