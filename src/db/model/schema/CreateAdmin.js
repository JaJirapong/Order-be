const Mongoose = require('mongoose')

const CreateAdminSchema = new Mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true
        },
        name:{
            type: String,
            require: true
        },
        position:{
            type: String,
            require: true
        }
    }
)

const createAdmin = Mongoose.model('admin-info', CreateAdminSchema)
module.exports = createAdmin