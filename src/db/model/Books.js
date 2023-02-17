const Books = require('./schema/books')
const Menu = require('./schema/CreateMenu')
const Admin = require('./schema/CreateAdmin')
const Order = require('./schema/CreateOrder')
const booking = require('./schema/CreateBooking')
const table = require('./schema/CreateTable')
const shop = require('./schema/CreateShop')
const Category = require('./schema/CreateCategory')
const CreateTime = require('./schema/CreateBkTime')

const Promise = require('bluebird')
const { query } = require('winston')




const create = (data) => {
    return new Promise((resolve, reject) => {
        const books = new Books(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
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

// Menu Start
const createmenu = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
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
        Menu.findOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const updateOnemenu = (query = {}) => {
    return new Promise((resolve, reject) => {
        const id = query._id
        const price = query.price
        const inform = query.inform
            Menu.updateOne({_id:id},{$set:{
                price: price,
                inform: inform
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
        Order.find(query).where("status").equals(true)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const FinishOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        Order.find(query).where("status").equals(false)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const upOrderStatus = (query = {}) => {
    return new Promise((resolve, reject) => {
        const id = query._id
        const status = query.status
            Order.updateOne({_id:id},{$set:{
                status: status,
      }})
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
//shop end

module.exports = {
    create,
    find,
    findOne,
    createmenu,  findmenu, findOnemenu, updateOnemenu, deleteMenu,
    createAdmin,  findAdmin, findallAdmin, deleteAdmin,
    createCategory, findCategory, upCategorystatus, deleteCategory,
    createOrder, findOrder, FinishOrder, upOrderStatus,
    createBooking, findAllBooking,findTableBooking, findOneWalkin, findOneBooking, deleteBooking, update_bkstatus,
    createTime, findBktime, deleteBktime,
    createTable, updateOneTable, findTable,
    createShop, findShop, updateShop,
    
}