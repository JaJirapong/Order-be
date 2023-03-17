# Order-be

หลังจากได้ ไฟล์มาแล้ว ให้ เปิดมันขึ้นมาด้วย VS code เปิด Terminal ใน VS code แล้วใช้คำสั่ง npm i เพื่อให้มันลง package ให้ครบ

พอทำเส็จแล้ว ให้ โหลด MongoDB มา เข้าไปใน MongoDB compass แล้วกดที่ New connection + มันจะได้ URI มา(ตัวอย่าง : mongodb://localhost:27017 )

เข้าไปใน ไฟล์ชื่อ server.js  เอา URI ไปใส่ตรงฟังค์ชั่น
mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")  (  mongodb://127.0.0.1:27017/mydb  -> /mydb มันคือชื่อของ ดาต้าเบสก้อนนั้น อยากตั้งชื่อว่าอะไรก็แล้วแต่เลย)
  .then(() => {
    console.log("db started!");
  })
  .catch((e) => {
    console.log(e);
  });
  
  ถ้าใช้ mongodb://localhost:27017 แล้วไม่ได้ก็ใช้ mongodb://127.0.0.1:27017 ลองดู
  
เริ่มเซิฟเวอร์ ด้วยการ เข้าไปในไฟล์ด้วย Command Prompt ไม่ก็ Power Shell ก็เอาแบบง่าย ก็คลิกขวาที่ไฟล์ แล้วเลือก เปิดด้วย Terminal

หลังจากนั้นก็ใช้คำสั่ง pm2 start pm2-local.json && pm2 log  มันคือ คำสั่ง start กับ คำสั่งดู log




 
