const Books = require('./schema/books')
const Menu = require('./schema/CreateMenu')
const Admin = require('./schema/CreateAdmin')
const Order = require('./schema/CreateOrder')
const booking = require('./schema/CreateBooking')
const table = require('./schema/CreateTable')
const shop = require('./schema/CreateShop')
const Category = require('./schema/CreateCategory')
const CreateTime = require('./schema/CreateBkTime')
const LoopImg = require('./schema/LoopImg')

const Promise = require('bluebird')
const { query } = require('winston')



// Test------------------------------------------
const create = (data) => {
    return new Promise((resolve, reject) => {
        const books = new Books(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
const TestDel = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.deleteMany(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const find = (query = {}) => {
    return new Promise((resolve, reject) => {
        Books.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
// Test-------------------------------------------




// Menu Start
const createmenu = (data) => {
    return new Promise((resolve, reject) => {
        const books = new Menu(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findmenu = (query = {}) => {
    return new Promise((resolve, reject) => {
        Menu.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findOnemenu = (query = {}) => {
    return new Promise((resolve, reject) => {
        Menu.findOne().where("_id").equals(query._id)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateOnemenu = (query = {}) => {
    console.log(query)
    return new Promise((resolve, reject) => {
            Menu.updateOne({_id:query._id},{$set:{
                price: query.price,
                inform: query.inform
      }})
          .then((result) => {
              resolve(result)
          })
          .catch((err) => {
              reject(err)
          })
    })
}

const deleteMenu = (query = {}) => {
    return new Promise((resolve, reject) => {
        Menu.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//Menu End

//Admin Start
const createAdmin = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        const books = new Admin(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findAdmin = (query = {}) => {
    return new Promise((resolve, reject) => {
        Admin.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findOne = (query = {}) => {
    return new Promise((resolve, reject) => {
        Admin.findOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findallAdmin = (query = {}) => {
    return new Promise((resolve, reject) => {
        Admin.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteAdmin = (query = {}) => {
    return new Promise((resolve, reject) => {
        Admin.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

//Admin End

//order Start
const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        const books = new Order(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        console.log(query)
        Order.find(query).where("status").equals(true).where("bookingId").equals(query.id)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findReportOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        console.log(query)
        Order.find(query).where("status").equals(false)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findDeliverOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        console.log(query)
        Order.find().where("bookingId").equals(query._id).where("tbname").equals(query.tbname).where("status").equals(false)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const allOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        console.log(query)
        Order.find(query).where("status").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const kitchenOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        Order.find(query).where("status").equals(true).where("tbname").equals(query.tbname)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const upOrderStatus = (query = {}) => {
    console.log(query)
    return new Promise((resolve, reject) => {
            Order.updateOne({_id:query._id},{$set:{
                status: query.status,
                isDeliver: query.isDeliver
      }})
          .then((result) => {
              resolve(result)
          })
          .catch((err) => {
              reject(err)
          })
    })
} 

const deleteUndeliver = (query = {}) => {
    console.log(query)
    return new Promise((resolve, reject) => {
        Order.deleteMany().where("status").equals(true).where("bookingId").equals(query._id)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//order End

//booking start
const createBooking = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        const books = new booking(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const bookingForKitchen = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.find(query).where("bkstatus").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const bookingForCheck = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.findOne(query).where("bkstatus").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


const findAllBooking = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.find(query).where("bkstatus").equals(true).where("bktable").equals(`${query.bktable}`)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findBookingRP = (query = {}) => {
    return new Promise((resolve, reject) => {
        console.log(query)
        booking.where("checkout").gte(query.start).where("checkout").lte(query.end).where("bktable").equals(query.bktable)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findOneBooking = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.where("bktable").equals(`${query.bktable}`).where("bktime").equals(`${query.bktime}`).where("bkstatus").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findOneWalkin = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.findOne().where("bktable").equals(`${query.bktable}`).where("customerType").equals(`${query.walk}`).where("bkstatus").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findTableBooking = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.where("bktable").equals(`${query.bktable}`).where("bkstatus").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const update_bkstatus = (query = {}) =>{
    return new Promise((resolve, reject) => {
            console.log(query)
            booking.updateOne({_id:query._id},{$set:{
                bkstatus: query.bkstatus,
                checkout: query.checkOut,
                bklate: query.bklate,
                checkin: query.checkIn
      }})
          .then((result) => {
              resolve(result)
          })
          .catch((err) => {
              reject(err)
          })
    })
}


const deleteBooking = (query = {}) => {
    return new Promise((resolve, reject) => {
        booking.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//booking end

// Bktime
const createTime = (data) => {
    return new Promise((resolve, reject) => {
        const books = new CreateTime(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findBktime = (query = {}) => {
    return new Promise((resolve, reject) => {
        CreateTime.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteBktime = (query = {}) => {
    return new Promise((resolve, reject) => {
        CreateTime.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//


// Category start
const createCategory = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        const books = new Category(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findCategory = (query = {}) => {
    return new Promise((resolve, reject) => {
        Category.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteCategory = (query = {}) => {
    return new Promise((resolve, reject) => {
        Category.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const upCategorystatus = (query = {}) => {
    return new Promise((resolve, reject) => {
        Category.updateOne({_id:query._id},{$set:{
            status: query.status,
  }})
          .then((result) => {
              resolve(result)
          })
          .catch((err) => {
              reject(err)
          })
    })
}
// Category End

//table start
const createTable = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        const books = new table(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findTable = (query = {}) => {
    return new Promise((resolve, reject) => {
        table.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateOneTable = (query = {}) => {
    return new Promise((resolve, reject) => {
        console.log(query)
         table.updateOne({name:query.bktable},{$set:{
            bkstatus: query.bkstatus,
            inUse: query.inUse
  }})
          .then((result) => {
              resolve(result)
          })
          .catch((err) => {
              reject(err)
          })
    })
}
//table end

//shop start
const createShop = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        const books = new shop(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findShop = (query = {}) => {
    return new Promise((resolve, reject) => {
        shop.findOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateShop = (query = {}) => {
    return new Promise((resolve, reject) => {
        shop.updateOne({_id:query._id},{$set:{
            opentime: query.opentime,
            closetime: query.closetime,
            image: query.image,
            shopPathImage:query.shopPathImage,
            shopImgName:query.shopImgName,
            infoPathImage:query.infoPathImage,
            infoImgName:query.infoImgName,
            phonenumber: query.phonenumber,
            facebook: query.facebook,
            line: query.line
  }})
          .then((result) => {
              resolve(result)
          })
          .catch((err) => {
              reject(err)
          })
    })
}

const shopLoopImg = (data) => {
    return new Promise((resolve, reject) => {
        const loopImg = new LoopImg(data)
        loopImg.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const findImg = (query = {}) => {
    return new Promise((resolve, reject) => {
        LoopImg.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteLoopImg = (query = {}) => {
    return new Promise((resolve, reject) => {
        LoopImg.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//shop end

module.exports = {
    create,TestDel,
    find,
    findOne,
    createmenu,  findmenu, findOnemenu, updateOnemenu, deleteMenu,
    createAdmin,  findAdmin, findallAdmin, deleteAdmin,
    createCategory, findCategory, upCategorystatus, deleteCategory,
    createOrder, findOrder, kitchenOrder,allOrder, upOrderStatus,findDeliverOrder,deleteUndeliver,
    createBooking, findAllBooking,findTableBooking, findOneWalkin,bookingForKitchen,bookingForCheck,
                   findOneBooking, deleteBooking, update_bkstatus,
    createTime, findBktime, deleteBktime,
    createTable, updateOneTable, findTable,
    createShop, findShop, updateShop,shopLoopImg,deleteLoopImg,findImg,
    findBookingRP,findReportOrder
    
}