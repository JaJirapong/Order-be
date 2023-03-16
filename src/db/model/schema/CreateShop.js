const Mongoose = require('mongoose')

const ShopSchema = new Mongoose.Schema(
    {
        name: {
            type: String
        },
        opentime:{
            type: String
        },
        closetime:{
            type: String
        },
        shopPathImage: { 
            type: String
         },
        shopImgName: { 
            type: String
         },
        infoPathImage: { 
            type: String
         },
        infoImgName: { 
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