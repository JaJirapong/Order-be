const {Books} = require('../db/model/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')
const _ = require('underscore')
const Moment = require("moment-timezone")
const moment = require('moment')
const { date } = require('joi')
const { format } = require('winston')
const fs = require('fs')
const excel = require('excel4node');
const end = require('date-fns/endOfDay')
const start = require('date-fns/startOfDay')
const { indexOf } = require('underscore')
const QRcode = require('qrcode')
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

// test Delete
const Delete = {
  auth: false,
  handler: async (request) => {
    try {
          const Delete = await Books.TestDel({bkstatus:false})
      return "Delete To!";
    } catch (err) {
      console.log(err)
    }
  }
}



// Menu Start -------------------------------------------------------------------------------------------------------
   // สร้าง Menu
const createmenu = {
  auth: false,
  handler: async (request) => {
    try { 
      const { title , price, category, status, pathImage,imgName , inform, category_id  } = request.payload
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
        imgName: `${imgName}`,
        pathImage: `${pathImage}`,
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

const findAllmenu = {
  auth: false,
  handler: async (request) => {
    try {
      const menus = await Books.findmenu({})
      return menus;
    } catch (err) {
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
// Menu End -----------------------------------------------------------------------------------------------------------------




// Admin Start ------------------------------------------------------------------------------------------------------------------
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
            text: 'Pass word need at least 5 character',
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
        // ส่งข้อมูลแบบ Token (ยังทำไม่ได้ //)
        const token = jwt.sign({
          id: AdminData._id,
          position: AdminData.position
        },jwt_secret)
        
        return data
      }
    } catch (err) {
      console.log(err)
    }
  }
}
// ผู้ใช้ระดับไหนถึงจะใช้เส้นนี้ได้ (ผู้จัดการ?)
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
// แสดง admin ทั้งหมด
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
//Admin End ----------------------------------------------------------------------------------------------------------------------




//Order Start -----------------------------------------------------------------------------------------------------------------------
//สร้าง Order รับข้อมูลแบบ Array เพื่อรองรับการสั่งทีละเยอะๆ ของลูกค้า
const createorder = {
  auth: false,
  handler: async (request) => {
    try {
      const { data } = request.payload
      let isCreate = "ยังไม่ได้สร้าง Order ขอรับ"
      for(const {total, tbname ,id, idBK} of data){
        const orders = {
          total: `${total}`,
          status: true,
          tbname: `${tbname}`,
          menuId: `${id}`,
          bookingId: idBK
        }
        if(!_.isEmpty(data)){
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
const oneOrder = {
  auth: false,
  handler: async (request) => {
    try {
      const { tbname } = request.payload
      const OrderData =[]
      const Orders = await Books.findOrder({tbname})
      const data = Orders.map(async val => {
         console.log(val.menuId)
        const menu = await Books.findOnemenu({_id:val.menuId})
              OrderData.push({
                total: val.total,
                munuName: menu.title,
                menuPrice: menu.price,
                menuImg: menu.pathImage,
                imgName: menu.imgName
              })
      })
      const promiseOrders = await Promise.all(data)
      return OrderData;
    } catch (err) {
      console.log(err)
    }
  }
}
// แสดง order ทั้งหมดที่ลูกค้าสั่ง ที่ยังไม่ได้ส่ง  ให้ครัวดู(ได้ใช้รึเปล่า? ยังไม่รู้ มันใช้ทำอะไรนะ?)
const customerOrder = {
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

// แสดง Order ให้ครัวดู โดย โดยแสดงว่า แต่ละโต้ะมี Order อะไรบ้าง
const getOrders = {
  auth: false,
  handler: async (request, h) => {
    try {
      const getTables = await Books.findTable({})
      let TablesOrders = []
      const mapTables = getTables.map( async (val,index) => {
        const orders = await Books.findOrder({tbname:val.name})
          let customerOrders = []
          if(!_.isEmpty(orders)){
            const mapOrder = orders.map( async val => {
              const menu = await Books.findOnemenu({_id:val.menuId})
              customerOrders.push({
                  _id:val._id,
                  total: val.total,
                  menuName: menu.title
                })
            })

            const sendMenu = await Promise.all(mapOrder) 
           
            TablesOrders.push({
              tbname : val.name,
              customerOrders
                 })
                     } 
      })
      
      // คำสั่ง ให้ทำ Promise ทั้งหมดให้เสร็จ
      const SendOrders = await Promise.all(mapTables)
      
      return TablesOrders
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
      let isUpdate = "ยังไม่อัพเดทครับ"
      for(let {_id}of data){
        const Update = await Books.upOrderStatus({_id,status:false})
        if(Update.modifiedCount == 1){
           isUpdate = "อัพเดทแล้วครับ"
        }
      }
      return isUpdate
    } catch (err) {
      console.log(err)
    }
  }
}
//Order End  ------------------------------------------------------------------------------------------------------------------------




//booking start ---------------------------------------------------------------------------------------------------------------------
  //สร้าง Booking
const createbooking = {
  auth: false,
  handler: async (request) => {
    try {
      const { bktable, bkname ,bknumber, bkcustomer,bktime ,isWalkIn , isBooking} = await request.payload
      if(_.isEmpty(bktable)){
        const res ={
          text: "ต้องมีชื่อโต้ะ"
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
  //ใช้อัพเดทสถานะ bkstatus ของ booking กับ table เพื่อบอกว่า ลูกค้า Check Out หรือ Check In แล้ว
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
        res = " ขาดตัวแปรเวลา หน่ะ"
        console.log(res)
        return res
      }
      if(_.isEmpty(bktable)){
        res = " ขาดตัวแปรโต้ะ หน่ะ "
        console.log(res)
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
  // Delete booking หน่ะ (ยังไม่ได้ใช้)
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
//booking end -----------------------------------------------------------------------------------------------------------------------




// Category start--------------------------------------------------------------------------------------------------------------------
    //สร้างหมวดหมู่
const createCategory = {
  auth: false,
  handler: async (request) => {
    try {
      const { category_name ,category_id } = request.payload
      if(_.isEmpty(category_name)){
          const res ={
            text: "Catagory Name is emty!"
          }
          return res
      }
      if(_.isEmpty(category_id)){
        const res ={
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
          text: 'this Category Already Exist'
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
// Category End---------------------------------------------------------------------------------------------------------------------



// bookingTime ----------------------------------------------------------------------------------------------------------------------
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
//  ----------------------------------------------------------------------------------------------------------------------------------



//table start  ------------------------------------------------------------------------------------------------------------------------
//สร้าง Table
const createtable = {
  auth: false,
  handler: async (request) => {
    try {
      const { chair ,name} = request.payload
      if(_.isEmpty(chair)){
        const res ={
          text: "Table Name is emty!"
      }
      return res
    }
      if(_.isEmpty(name)){
        const res ={
          text: "Chair amount is emty!"
      }
      return res
    }
      const table = {
        chair: `${chair}`,
        bkstatus: false,
        inUse: false,
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
//table end  --------------------------------------------------------------------------------------------------------------------------



// Shop Info  -------------------------------------------------------------------------------------------------------------------------
  //สร้าง ข้อมูลร้านค้า
const createshop = {
  auth: false,
  handler: async (request) => {
    try {
      const { name, opentime ,closetime, pathImage,imgName, phonenumber, facebook, line} = request.payload
      const Shop = {
        name: `${name}`,
        opentime: `${opentime}`,
        closetime: `${closetime}`,
        pathImage: `${pathImage}`,
        imgName:imgName ,
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
//  -----------------------------------------------------------------------------------------------------------------------------------

// สร้าง QR code
const getQRcode = {
  auth: false,
  handler: async (request) => {
    try {
      const { id , tbname } = request.payload
      if(id.length === 0 ){
         const res = "Booking ID is Empty!"
         return res
      }

      if(tbname.length === 0 ){
        const res = "Table Name is Empty!"
        return res
     }
      let URL = 'http://192.168.1.47:3000/Food-Lance/menu?id='+id+'&tbname='+tbname
      console.log(URL)
      const QR = await QRcode.toDataURL(URL)
      const qrString = await QRcode.toString(URL,{type:'terminal'})
      console.log(qrString)
      return QR
    } catch (err) {
      console.log(err)
    }
  }
}


createDirRecursively = (dir) => {
  if (!fs.existsSync(dir)) {        
      createDirRecursively(path.join(dir, ".."));
      fs.mkdirSync(dir);
  }
}

const excelFile = {
  auth: false,
  handler: async (request) => {
    try {
      const { start, end ,bktable} = request.payload
      const Timenow = Moment(Date.now()).format('DD.MM.YYYY')
      let workbook = new excel.Workbook();

      // Style คือ ไอ้ที่จะเอาไปแสดงใน Excel เช่น ขนาดตัวหนังสือ สีตัวหนังสือ
      let style = workbook.createStyle({
        font: {
          size: 13,
        },
        alignment: { 
          horizontal: 'center',
          vertical: 'center'
      },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
      });

      // WorkSheet คือ หน้าใน ไฟล์ Excel
      let BookingReport = workbook.addWorksheet('Booking Report');
      let orderReport = workbook.addWorksheet('Order Report');
      
      // Report ของ Booking Start-----------------------------------------------
      // หัวข้อ Colum ต่างๆ ในหน้า Booking Report
      BookingReport.cell(1,1).string("โต้ะ").style(style);
      BookingReport.cell(1,2).string("ประเภทลูกค้า").style(style);
      BookingReport.cell(1,3).string("ชื่อลูกค้า").style(style);
      BookingReport.cell(1,4).string("เบอร์โทร").style(style);
      BookingReport.cell(1,5).string("จำนวนลูกค้า").style(style);
      BookingReport.cell(1,6).string("เช็คอิน").style(style);
      BookingReport.cell(1,7).string("เช็คเอ้าต์").style(style);
      BookingReport.cell(1,8).string("เงินที่ได้").style(style);
      
      orderReport.cell(1,1).string("Booking_ID").style(style);
      orderReport.cell(1,2).string("เมนู").style(style);
      orderReport.cell(1,3).string("จำนวน").style(style);
      orderReport.cell(1,4).string("ราคา").style(style);
      
      //ความกว้างของ Column -----------------------------
      BookingReport.column(1).setWidth(10);
      BookingReport.column(2).setWidth(15);
      BookingReport.column(3).setWidth(18);
      BookingReport.column(4).setWidth(13);
      BookingReport.column(5).setWidth(12);
      BookingReport.column(6).setWidth(18);
      BookingReport.column(7).setWidth(18);
      BookingReport.column(8).setWidth(12);

      orderReport.column(1).setWidth(26);
      // ส่วนดึงข้อมูลด้วย BookingID เพื่อหา Order-------------------------------------
      const getBooking = await Books.findBookingRP({start,end,bktable}) 
      let bookingOrders = []                                            
      let row = 1                                                       
      const mapBooking = getBooking.map( async (val,index) => {         
        const orders = await Books.findOrder({bookingId:val._id})
          let customerOrders = []
          let valueTotal = 0

            const mapOrder = orders.map( async (order) => {
              const menu = await Books.findOnemenu({_id:order.menuId})
              
              customerOrders.push({
                  total: order.total,
                  menuName: menu.title,
                  menuPrice: menu.price
                })
                valueTotal += order.total * menu.price

                // console.log(menu.price)
                if(!_.isEmpty(orders)){
                  row += 1
                  let totalPrice = order.total * menu.price
                  orderReport.cell(row,1).string(val._id.toString());
                  orderReport.cell(row,2).string(menu.title).style(style);
                  orderReport.cell(row,3).string(order.total).style(style);
                  orderReport.cell(row,4).string(totalPrice+' บาท').style(style);
                }
            })
            
            const sendMenu = await Promise.all(mapOrder) 
            bookingOrders.push({
              customerName : val.bkname,
              customerTable: val.bktable,
              customerTotal: val.bkcustomer,
              checkIn: val.checkin,
              checkOut: val.checkout,
              customerOrders,
              valueTotal: valueTotal,
                 })
          let R = 2+index
          BookingReport.cell(R,1).string(val.bktable).style(style);
          BookingReport.cell(R,2).string(val.customerType).style(style);
          BookingReport.cell(R,3).string(val.bkname).style(style);
          BookingReport.cell(R,4).string(val.bknumber).style(style);
          BookingReport.cell(R,5).string(val.bkcustomer).style(style);
          const checkIn = Moment(val.checkin).tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm");
          BookingReport.cell(R,6).string(checkIn).style(style);
          const checkOut = Moment(val.checkout).tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm");
          BookingReport.cell(R,7).string(checkOut).style(style);
          BookingReport.cell(R,8).string(valueTotal+' บาท ').style(style);
      })
      const SendOrders = await Promise.all(mapBooking)
      // Report ของ Booking End-------------------------------------------------

      //เลือกจุดที่จะเก็บไฟล์และเจเนอเรท ไฟล์ Excel 
      workbook.write('../../BE-Report/Report-'+bktable+'_'+start+'_to_'+end+'.xlsx');
      // console.log('fileWrite: ', fileWrite)
      const res = "Report Create!!"
      return {bookingOrders,res}
    } catch (error) {
      console.log(error)
    }
  }
}



module.exports = {
  userSignUp,
  testfind,Delete,
  createmenu, findmenu,findAllmenu, updateMenu, deletemenu,
  createadmin, authadmin,  findadmin, deleteAdmin,
  createCategory, findCategory, updateCategory, deleteCategory,
  createorder, oneOrder, customerOrder, getOrders, Order_statusUpdate,
  createbooking, findAllBooking, findOneBooking, findOneWalkin, deleteBooking, bkstatus_update,updateBklate,
  createTime, findBktime, Bktime, deleteBktime,
  createtable, updateTable, findTable,
  createshop, findShop, UpdateShop,
  excelFile,
  getQRcode
}