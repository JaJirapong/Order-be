const {Books} = require('../db/model/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')
const _ = require('underscore')
const Moment = require("moment-timezone")
const { date } = require('joi')
const { format } = require('winston')
// const multer  = require('multer')
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


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
      const { bktime } = request.payload
      const time = Date.now()
      const hour = Moment(time).format('H.mm')
      const bookData = await Books.find({name:"test"})
      if(bktime < hour){
          console.log("Hello!")
          const TbUpdate = await Books.updateOneTable({bktable:"A2",bkstatus:false})
      }
      console.log(bktime)
      console.log(hour)
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
      if(_.isEmpty(category)){
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
      const Menu = {
        title: `${title}`,
        price: `${price}`,
        category: `${category}`,
        category_id:`${category_id}`,
        status: `${status}`,
        image: `${image}`,
        inform: `${inform}`,
      }
      const MenuData = await Books.createmenu(Menu)
      return MenuData;
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
  // แสดง 1 เมนู ด้วย ID
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
  // ลบทีละหลายเมนู
const deletemenu ={
  auth: false,
  handler: async (request) => {
    try {
      const { data } = request.payload
      let isDelete = false
      for(const {_id} of data){
        console.log(_id)
        const Delete = await Books.deleteMenu({_id})
        console.log(Delete)
        if( Delete.deletedCount == 1){
          isDelete = true
         }
      }
      return isDelete
    } catch (err) {
      console.log(err)
    }
  }
}
  // อัพเดท เมนู
const updateMenu = {
  auth: false,
  handler: async (request) => {
    try {
      const { _id , price , inform} = request.payload
      const Udate = await Books.updateOnemenu({_id,price,inform})
      return Udate
    } catch (err) {
      console.log(err)
    }
  }
}
// Menu End


// Admin Start
// สร้าง Admin (ยังไม่รู้ว่า ใครเข้าใช้)
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
// แสดง admin ทั้งหมด (ใช้ได้เฉพาะ ระดับ ผู้จัดการร้านขึ้นไป)
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
//สร้าง Order รับข้อมูลแบบ Array เพื่อรองรับการสั่งทีละเยอะๆ ของลูกค้า
const createorder = {
  auth: false,
  handler: async (request) => {
    try {
      const { data } = request.payload
      let isCreate = "ยังไม่ได้สร้าง Order ขอรับ"
      for(const {total, tbname ,title} of data){
        const orders = {
          total: `${total}`,
          status: true,
          tbname: `${tbname}`,
          title: `${title}`,
        }
        if(await !_.isEmpty(data)){
          isCreate = "สร้าง Order แล้วขอรับ"
      }
        const bookData = await Books.createOrder(orders)
      }
      return isCreate;
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
// แสดง order ทั้งหมดที่ลูกค้าสั่ง ที่ยังไม่ได้ส่ง  ให้ครัวดู
const AllOrder = {
  auth: false,
  handler: async (request) => {
    try {
      const bookData = await Books.FinishOrder({})
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}

const getOrders = {
  auth: false,
  handler: async (request, h) => {
    try {
      const getTables = await Books.findTable({})
      let Orders = []
      const getOrders = getTables.map( async val => {
        const Order = await Books.findOrder({tbname:val.name})
        if(!_.isEmpty(Order)){
          Orders.push({tbname : val.name,
            order : Order})
          return null
        }
      })
      // คำสั่ง ให้ทำ Promise ทั้งหมดให้เส็จ(ไม่ได้ใช้)
      const SendOrders = await Promise.all(getOrders)
      return Orders
    } catch (error) {
      log.error(error)
      const res = Response.implementError(transaction, lang)
      return h.response(res).code(500)
    }
  }
}

// ครัวอัพเดทสถานะ ออร์เดอร์
const Order_statusUpdate = {
  auth: false,
  handler: async (request) => {
    try {
      const { data } = request.payload
      let isUpdate = false
      for(let {_id}of data){
        const Update = await Books.upOrderStatus({_id,status:false})
        if(Update.modifiedCount == 1){
           isUpdate = true
        }
      }
      return isUpdate
    } catch (err) {
      console.log(err)
    }
  }
}
//Order End


//booking start
  //สร้าง Booking
const createbooking = {
  auth: false,
  handler: async (request) => {
    try {
      const { bktable, bkname ,bknumber, bkcustomer,bktime ,isWalkIn , isBooking} = await request.payload
      if(_.isEmpty(bktable)){
        const res ={
          status: "Error",
          text: "ชื่อโต้ะ is emty!"
        }
        return res
       }

       if(bknumber.length<10){
        const res = {
            error:"ค่าที่ใส่มา มีความยาวน้อยกว่า 10"
        }
        return res
        }
       if(bknumber.length>10){
       const res = {
            error:"ค่าที่ใส่มา มีความยาวมากกว่า 10"
        }
       return res
        }

       if(isBooking === true){         
       const booking = {
         bktable:`${bktable}`,
         bkstatus: true,
         bkname: `${bkname}`,
         bknumber: `${bknumber}`,
         bklate: false,
         bktime:`${bktime}`,
         bkcustomer: `${bkcustomer}`,
         customerType: "ลูกค้า Booking"
       }
       const bookData = await Books.createBooking(booking)
       const upDateTable = await Books.updateOneTable({bktable:booking.bktable,bkstatus:booking.bkstatus})
       return bookData;
       }

       if(isWalkIn === true){
        const booking = {
          bktable: `${bktable}`,
          bkstatus: true,
          bkname: `${bkname}`,
          bknumber: `${bknumber}`,
          bklate: false,
          checkin: Date.now(),
          walkin: Date.now(),
          bkcustomer: `${bkcustomer}`,
          customerType: "ลูกค้า Walk In",
          inUse: true
        }
        const bookData = await Books.createBooking(booking)
        const upDateTable = await Books.updateOneTable({bktable:booking.bktable,bkstatus:booking.bkstatus,inUse:booking.inUse})
        return bookData;
       }

    } catch (err) {
      console.log(err)
    }
  }
}
  // Update สถานะ bklate เป็น true สถานะการจอง = false  เพื่อแจ้งว่าลูกค้าคนนี้มาช้า (admin ตัดสินใจเอง)
const updateBklate = {
    auth: false,
    handler: async (request) => {
      try {
        const { _id, bktable } = request.payload
          const Update = await Books.update_bkstatus({_id,bklate:true, bkstatus: false})
          const upDateTable = await Books.updateOneTable({bktable, bkstatus:false})
        return {Update,upDateTable}
      } catch (err) {
        console.log(err)
      }
    }
  }

  //แสดง Booking ทั้งหมด
const findAllBooking = {
    auth: false,
    handler: async (request) =>{
      try {
        const {bktable} = request.payload
        const BookingData = await Books.findAllBooking({bktable})
        return BookingData;
      } catch (err) {
        console.log(err)
      }
    }
}
  //ใช้อัพเดทสถานะ bkstatus ของ booking กับ table เพื่อบอกว่า ลูกค้า Check Out แล้วและ โต้ะว่างแล้ว (น่าทำงานตอนเช็คเอ้าท)
const bkstatus_update = {
  auth: false,
  handler: async (request) => {
    try {
      const { _id, bktable, isCheckIn , isCheckOut} = request.payload
      const bkstatus = false , use = true , notUse = false
      const checkOut = Date.now()
      const checkIn = Date.now()
      if(isCheckIn === true){
        const BKUpdate = await Books.update_bkstatus({_id,checkIn})
        const TbUpdate = await Books.updateOneTable({bktable,inUse:use})
        return "Booking Check In !!"
      }
      if(isCheckOut === true){
        const BKUpdate = await Books.update_bkstatus({_id,bkstatus,checkOut})
        const TbUpdate = await Books.updateOneTable({bktable,inUse:notUse,bkstatus})
        return "Booking and Table สถานะการ booking อัพเดทแล้ว"
      }
      return "Error ไม่ใช่ทั้ง Check In และ Check Out"
    } catch (err) {
      console.log(err)
    }
  }
}
  //แสดง 1 Booking
const findOneBooking = {
  auth: false,
  handler: async (request) =>{
    try {
      const {bktable,bktime} = request.payload
      console.log(bktable,bktime)
      let res = ""
      if(_.isEmpty(bktime)){
        res = " ขาดตัวแปรเวลา หน่ะ ไม่ต้องกังวล"
        return res
      }
      if(!_.isEmpty(bktable)&&!_.isEmpty(bktime)){
        const OneBooking = await Books.findOneBooking({bktable,bktime})
        console.log(OneBooking)
        return OneBooking
      }
    } catch (err) {
      console.log(err)
    }
  }
}
const findOneWalkin = {
  auth: false,
  handler: async (request) =>{
    try {
      const {bktable} = request.payload
        console.log(bktable)
        const walk = "ลูกค้า Walk In" 
        const OneBooking = await Books.findOneWalkin({bktable,walk})
        console.log(OneBooking)
        return OneBooking
    } catch (err) {
      console.log(err)
    }
  }
}

  // Delete booking หน่ะ (คนที่ได้ใช้ได้ น่าจะระดับ Manager ไม่ก็ Owner เพราะมันต้องเอาข้อมูลไปทำ รายงาน Admin ไม่ควรลบได้)
const deleteBooking = {
  auth: false,
  handler: async (request) => {
    try {
      const { _id } = request.payload
      const deleteBooking = await Books.deleteBooking({_id})
      return deleteBooking
    } catch(err) {
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
    } catch(err) {
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

// bookingTime
const createTime = {
  auth: false,
  handler: async (request) => {
    try {
      const { bktime } = request.payload
      const time = {
        bktime: `${bktime}`
      }
      const res = "กรุณาใส่เวลา"
      if(!_.isEmpty(bktime)){
        const Data = await Books.createTime(time)
        return Data
      }
      if(_.isEmpty(bktime)){
        return res
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const findBktime = {
  auth: false,
  handler: async (request) =>{
    try {
      const Time = await Books.findBktime({})
      return Time;
    } catch (err) {
      console.log(err)
    }
  }
}

const Bktime = {
  auth: false,
  handler: async (request) =>{
    try {
      const { bktable } = request.payload
      const Time = await Books.findBktime({})
      let res = ""
      const Booking = await Books.findTableBooking({bktable})
      let BookingTime = []
      if (_.isEmpty(Booking)){
          res = " อาจจะไม่มี Booking หรือ หาไม่เจอ "
          return res
      }
      console.log("Booking :",Booking)
      const getBooking = Time.map( val => {
        console.log(" เวลาจากตาราง ",val.bktime)
        if(val.bktime !== Booking[0].bktime){
          BookingTime.push({bktime:val.bktime})
          return null
        }
      })
      console.log("ผลลัพธ์ :",BookingTime)
      return BookingTime
    } catch (err) {
      console.log(err)
    }
  }
}

const deleteBktime = {
  auth: false,
  handler: async (request) => {
    try {
      const { data } = request.payload
      let isDelete = "ยังไม่ได้ลบ"
      for (let _id of data) {
        const deleteTime = await Books.deleteBktime({_id})
        if(deleteTime.deletedCount == 1){
          isDelete = "ลบแล้วครับ"
        }
      }
      return isDelete
    } catch(err) {
       console.log(err)
    }
  }
}
//


//table start
//สร้าง Table
const createtable = {
  auth: false,
  handler: async (request) => {
    try {
      const { chair ,name} = request.payload
      if(_.isEmpty(chair)){
        const res ={
          status: "Error",
          text: "Table Name is emty!"
        }
        return res
    }
    if(_.isEmpty(name)){
      const res ={
        status: "Error",
        text: "Chair amount is emty!"
      }
      return res
  }
      const table = {
        chair: `${chair}`,
        bkstatus: false,
        name: `${name}`,
      }
      const CreateTable = await Books.createTable(table)
      return CreateTable;
    } catch (err) {
      console.log(err)
    }
  }
}
 //Find Table
const findTable = {
  auth: false,
  handler: async (request) =>{
    try {
      const Table = await Books.findTable({})
      return Table;
    } catch (err) {
      console.log(err)
    }
  }
}

// เอาไว้อัพเดท bkstatus โดยทำงานคู่กับ Create Booking สร้างบุ้คกิ้งปุ้บ ก็ให้อัพเดทว่า โต้ะ โดนจองแล้ว (ไม่ได้ใช้)
const updateTable = {
  auth: false,
  handler: async (request) => {
    try {
      const { _id, bkstatus} = request.payload
      const upDateTable = await Books.updateOneTable({_id,bkstatus})
      return upDateTable
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
      const Shop = {
        name: `${name}`,
        opentime: `${opentime}`,
        closetime: `${closetime}`,
        image: `${image}`,
        phonenumber: `${phonenumber}`,
        facebook: `${facebook}`,
        line: `${line}`,
      }
      const CreateShop = await Books.createShop(Shop)
      return CreateShop;
    } catch (err) {
      console.log(err)
    }
  }
}

const findShop = {
  auth: false,
  handler: async (request) =>{
    try {
      const Table = await Books.findShop({})
      return Table;
    } catch (err) {
      console.log(err)
    }
  }
}

// Update Shop (ยังไม่ได้เอาไปใช้งาน)
const UpdateShop = {
  auth: false,
  handler: async (request) => {
    try {
      const {_id, opentime, closetime, image, phonenumber, facebook, line} = request.payload
      const upDateTable = await Books.updateShop({_id,opentime, closetime, image, phonenumber, facebook, line})
      return upDateTable
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
  createorder, Order, AllOrder, getOrders, Order_statusUpdate,
  createbooking, findAllBooking, findOneBooking, findOneWalkin, deleteBooking, bkstatus_update,updateBklate,
  createTime, findBktime, Bktime, deleteBktime,
  createtable, updateTable, findTable,
  createshop, findShop, UpdateShop
}