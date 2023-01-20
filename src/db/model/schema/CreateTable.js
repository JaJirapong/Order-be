const Mongoose = require('mongoose')

const TableSchema = new Mongoose.Schema(
    {
        chair: {
            type: String
        },
        table_id:{
            type: String
        },
        status:{
            type: String
        },
        name:{
            type: String
        }
    }
)

const Table = Mongoose.model('Table', TableSchema)
module.exports = Table