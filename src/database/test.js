const database = require("./db")
const createProffy = require("./createProffy")

database.then(async(db)=>{
    proffyValue ={
        name:"Matheus de Oliveira",
        avatar:"https://avatars1.githubusercontent.com/u/69112909?s=460&u=8033fa02b2427277918ab75cac1ce0d42ef06264&v=4",
        whatsapp: "9999-8888",
        bio: "Ficcionado por Matemática, quase sempre, mas apaixonado mesmo só por...C++"
    }
    classesValues ={
        subject:"Matemática",
        cost:"50"
    }
    classScheduleValue=[
    {
        weekday: 1,
        time_from: 1200,
        time_to: 5000     
        
    }

    ]
   /*  createProffy(db, {proffyValue, classesV, classScheduleV}) */

   const selectedProffys = await db.all("SELECT * FROM proffys")

   const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
   `)

})