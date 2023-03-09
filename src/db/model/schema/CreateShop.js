const Mongoose = require('mongoose')

const ShopSchema = new Mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        opentime:{
            type: String
        },
        closetime:{
            type: String
        },
        pathImage: { 
            type: String
         },
         imgName: { 
            type: String
         },
        phonenumber:{
            type: String
        },
        facebook:{
            type: String
        },
        line:{
            type: String
        }
    }
)

const shop = Mongoose.model('shopinfo', ShopSchema)
module.exports = shop