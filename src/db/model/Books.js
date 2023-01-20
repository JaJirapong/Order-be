const Books = require('./schema/books')
const Menu = require('./schema/CreateMenu')
const Admin = require('./schema/CreateAdmin')
const Order = require('./schema/CreateOrder')
const booking = require('./schema/CreateBooking')
const table = require('./schema/CreateTable')
const shop = require('./schema/CreateShop')
const Category = require('./schema/CreateCategory')

const Promise = require('bluebird')




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
        const id = query.id
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
        const books = new Order(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const updateOrder= (query = {}) => {
    return new Promise((resolve, reject) => {
        const id = query.id
        const total = query.total
        console.log(id, total)
        Order.updateOne({_id:id},{$set:{
                     total: total
        }})
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const deleteOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        Order.deleteOne(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findOrder = (query = {}) => {
    return new Promise((resolve, reject) => {
        Order.find(query)
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
        const books = new booking(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
//booking end

// Category start
const createCategory = (data) => {
    return new Promise((resolve, reject) => {
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
        const books = new table(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
//table end

//shop start
const createShop = (data) => {
    return new Promise((resolve, reject) => {
        const books = new shop(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
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
    createOrder, findOrder, updateOrder, deleteOrder, upOrderStatus,
    createBooking,
    createTable,
    createShop,
    
}