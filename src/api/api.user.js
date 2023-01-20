const {Books} = require('../db/model/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')
const _ = require('underscore')


const jwt_secret = 'aawdklakfijklkgjkdfawd123132343232@#$@##dq'

//test 1
const userSignUp = {
  auth: false,
  handler: async (request) => {
    try {
      const books = {
        name: "test"
      }
      //const bookData = await Books.create(books)
      return books;
    } catch (err) {
      console.log(err)
    }
  }
}
// test 2
const testfind = {
  auth: false,
  handler: async (request) => {
    try {
      const bookData = await Books.find({name:"test"})
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}

// Menu Start
   // สร้าง Menu
const createmenu = {
  auth: false,
  handler: async (request) => {
    try { 
      const { title , price, category, status, image, inform, category_id  } = request.payload
      const books = {
        title: `${title}`,
        price: `${price}`,
        category: `${category}`,
        category_id:`${category_id}`,
        status: `${status}`,
        image: `${image}`,
        inform: `${inform}`,
      }
      const bookData = await Books.createmenu(books)
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}
   // แสดงเมนู ด้วยหมวดหมู่
const findmenu = {
  auth: false,
  handler: async (request) => {
    try {
      const { category_id } = request.payload
      const menus = await Books.findmenu({category_id})
      return menus;
    } catch (err) {
      console.log(err)
    }
  }
}
  //  แสดง 1 เมนู ด้วย ID
const findOnemenu ={
  auth: false,
  handler: async (request) => {
    try {
      const { _id } = request.payload
      const onemenu = await Books.findOnemenu({_id})
      const menu = {
        image: onemenu.image,
        title: onemenu.title
      }
      return menu
    } catch(err) {
       console.log(err)
    }
  }
}
  // ลบเมนู
const deletemenu ={
  auth: false,
  handler: async (request) => {
    try {
      const { _id } = request.payload
      const onemenu = await Books.deleteMenu({_id})
      const del = {
           status: "ok",
           message: "Item Deleted!!"
      }
      return del
    } catch(err) {
       console.log(err)
    }
  }
}
  //อัพเดท เมนู
const updateMenu = {
  auth: false,
  handler: async (request) => {
    try {
      const { id , price , inform} = request.payload
      const Udate = await Books.updateOnemenu({id,price,inform})
      return Udate
    } catch (err) {
      console.log(err)
    }
  }
}

// Menu End

// Admin Start
 //สร้าง Admin (ยังไม่รู้ว่า ใครเข้าใช้)
const createadmin = {
  auth: false,
  handler: async (request) => {
    try {
      const { username, password ,name ,position } = request.payload

      if(!username || typeof username !== 'string'){
        const res = {
          text: 'Invalid User Name',
          error: true
         }
         return res
      }
      if(!password || typeof password !== 'string'){
        const res = {
          text: 'Invalid Password',
          error: true
         }
         return res
      }
      if (password.length < 5){
        const res = {
            text: 'Pass word need at leat 5 character',
            error: true
        }
        return res
      }
      else{
        // ใช้ Bcrypy เข้ารหัส password แล้วเก็บไว้ใน database
        const crypted = await bcrypt.hash(password,10)
        const admins = {
        username: `${username}`,
        password: `${crypted}`,
        name: `${name}`,
        position: `${position}`,
      }
        const regis = true;
        //ตัวแปร regis ใน admin มีไว้ส่งให้ผู้ใช้รู้เฉยๆว่า สมัครสำเร็จ ไม่ได้ยัดเข้าไปใน database
        const bookData = await Books.createAdmin(admins)
        return {bookData,regis};
      }

    } catch (err) {
      if(err.code == 11000){
        const res = {
          text: 'Username Already Exist',
          error: true
                   }
      return res
      }
      console.log(err)
    }
  }
}
// Login admin
const authadmin = {
  auth: false,
  handler: async (request) => {
    try {
      const { username, password } = request.payload
      const AdminData = await Books.findOne({username})
      if(!username){
        const res = "error user is not correct!!"
        return res
      }
      //รับข้อมูล username,password มาแล้วเอา username มาค้นข้อมูลใน database ได้มาแล้วก็เอา password ที่รับมาจากผู้ใช้
      //มาเทียบกับ password ที่ได้มาจาก Database โดยใช้ Bcrypt ถอดรหัสและเทียบ
      if(await bcrypt.compare(password, AdminData.password)){
        // ส่งข้อมูลแบบธรรมดา
        const data = {
          id: AdminData._id,
          name:AdminData.name,
          position: AdminData.position,
          auth : true
        }
        return data
      }
    } catch (err) {
      console.log(err)
    }
  }
}
// ระดับ ผู้จัดการ ถึงจะใช้เส้นนี้ได้
const deleteAdmin ={
  auth: false,
  handler: async (request) => {
    try {
      const { _id } = request.payload
      const onemenu = await Books.deleteAdmin({_id})
      const res = {
           status: "ok",
           message: "Item Deleted!!"
      }
      return {onemenu,res}
    } catch(err) {
       console.log(err)
    }
  }
}

//แสดง admin ทั้งหมด (ใช้ได้เฉพาะ ระดับ ผู้จัดการร้านขึ้นไป)
const findadmin = {
  auth: false,
  handler: async (request) => {
    try {
      const bookData = await Books.findallAdmin({})
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}
//Admin End

//Order Start
  //สร้าง Order
const createorder = {
  auth: false,
  handler: async (request) => {
    try {
      const { total, status, tbname ,title } = request.payload

      const orders = {
        total: `${total}`,
        status: `${status}`,
        tbname: `${tbname}`,
        title: `${title}`,
      }
      const bookData = await Books.createOrder(orders)
      return bookData;
        } catch (err) {
      console.log(err)
        }
  }
}
// แสดง Order ที่ลูกค้าสั่ง โดยใช้ ชื่อโต้ะ เป็นตัวค้นหา
const Order = {
  auth: false,
  handler: async (request) => {
    try {
      const { tbname } = request.payload
      const bookData = await Books.findOrder({tbname})
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}

//ครัวอัพเดทสถานะ ออร์เดอร์
const Order_statusUpdate = {
  auth: false,
  handler: async (request) => {
    try {
      const { _id, status} = request.payload
      const Udate = await Books.upOrderStatus({_id,status})
      return Udate
    } catch (err) {
      console.log(err)
    }
  }
}

// อัพเดท ออร์เดอร์ โดยลูกค้าสามารถเปลี่ยน จำนวนที่สั่ง ในตะกร้า ได้
const updateOrder = {
  auth: false,
  handler: async (request) => {
    try {
      const { id, total} = request.payload
      const Udate = await Books.updateOrder({id,total})
      return Udate
    } catch (err) {
      console.log(err)
    }
  }
}

// ลบออร์เดอร์ ลูกค้าลบออร์เดอร์
const deleteOrder ={
  auth: false,
  handler: async (request) => {
    try {
      const { _id } = request.payload
      const onemenu = await Books.deleteOrder({_id})
      return onemenu
    } catch(err) {
       console.log(err)
    }
  }
}
//Order End

//booking start
  //สร้าง Cooking
const createbooking = {
  auth: false,
  handler: async (request) => {
    try {
      const { bkstatus, bkname ,bknumber, bktime, bklate, bkarrive, checkin, checkout, starttime } = request.payload
      const booking = {
        bkstatus: `${bkstatus}`,
        bkname: `${bkname}`,
        bknumber: `${bknumber}`,
        bktime: `${bktime}`,
        bklate: `${bklate}`,
        bkarrive: `${bkarrive}`,
        checkin: `${checkin}`,
        checkout: `${checkout}`,
        starttime: `${starttime}`,
      }
      const bookData = await Books.createBooking(booking)
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}
//booking end

// Category start
    //สร้างหมวดหมู่
const createCategory = {
  auth: false,
  handler: async (request) => {
    try {
      const { category_name ,category_id } = request.payload
      if(_.isEmpty(category_name)){
          const res ={
            status: "Error",
            text: "Catagory Name is emty!"
          }
          return res
      }
      if(_.isEmpty(category_id)){
        const res ={
          status: "Error",
          text: "Catagory ID is emty!"
        }
        return res
    }
      const category = {
        category_name: `${category_name}`,
        category_id: `${category_id}`,
        status:true
      }
      const bookData = await Books.createCategory(category)
      return bookData;
    } catch (err) {
      if(err.code == 11000){
        const res = {
          text: 'this Category Already Exist',
          error: true
                   }
      return res
      }
      console.log(err)
    }
  }
}
    //แสดงหมวดหมู่ ทั้งหมด
const findCategory = {
  auth: false,
  handler: async (request) =>{
    try {
      const bookData = await Books.findCategory({})
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}
   //อัพเดท Category ทีละหลายๆตัว  เช่น ติ้ก3 อัพเดท 3
const updateCategory = {
  auth: false,
  handler: async (request) => {
    try {
      const { data } = request.payload
      let isUpdate =  false
      console.log(data)
      for(const {_id,status} of data){
        const Udate = await Books.upCategorystatus({_id,status})
        console.log(Udate)
       if( Udate.modifiedCount == 1){
        isUpdate = true
       }
       console.log(isUpdate)
      }
      return isUpdate
    } catch (err) {
      console.log(err)
    }
  }
}
const deleteCategory = {
  auth: false,
  handler: async (request) => {
    try {
      const { _id } = request.payload
      const onemenu = await Books.deleteCategory({_id})
      return onemenu
    } catch(err) {
       console.log(err)
    }
  }
}
// Category End

//table start

//สร้าง Table
const createtable = {
  auth: false,
  handler: async (request) => {
    try {
      const { chair, status ,name} = request.payload
      const booking = {
        chair: `${chair}`,
        status: `${status}`,
        name: `${name}`,
      }
      const bookData = await Books.createTable(booking)
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}
//table end

// Shop Info
  //สร้าง ข้อมูลร้านค้า
const createshop = {
  auth: false,
  handler: async (request) => {
    try {
      const { name, opentime ,closetime, image, phonenumber, facebook, line} = request.payload
      const booking = {
        name: `${name}`,
        opentime: `${opentime}`,
        closetime: `${closetime}`,
        image: `${image}`,
        phonenumber: `${phonenumber}`,
        facebook: `${facebook}`,
        line: `${line}`,
      }
      const bookData = await Books.createShop(booking)
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}
//

module.exports = {
  userSignUp,
  testfind,
  createmenu, findOnemenu,  findmenu, updateMenu, deletemenu,
  createadmin, authadmin,  findadmin, deleteAdmin,
  createCategory, findCategory, updateCategory, deleteCategory,
  createorder, Order, updateOrder, deleteOrder, Order_statusUpdate,
  createbooking,
  createtable,
  createshop
}