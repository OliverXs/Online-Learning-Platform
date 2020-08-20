const { subjects, weekdays, getSubject, convertHoursToMinutes} =require("./utils/format")
const Database = require("./database/db")
const createProffy = require("./database/createProffy")


function pageLanding (_req, res){
    return res.render("index.html")
}

async function pageStudy (_req, res){
    const filters = (_req.query)

    if( !filters.subject || !filters.weekdays || !filters.time){
        return res.render("study.html",{filters, subjects, weekdays})

    }

    const timeinMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekdays}
            AND class_schedule.time_from <= ${timeinMinutes}
            AND class_schedule.time_to > ${timeinMinutes}
            )
        AND classes.subject = "${filters.subject}"
    `

    try{
        const db = await database
        const proffys = await db.all(query)
        
        proffys.map((proffy)=>{
            proffy.subject =  getSubject(proffy.subject)
        })

        return res.render("study.html",{proffys, subject, filters, weekdays })
    }catch(error){
        
    }

}

function pageGiveClasses (_req, res){

    return res.render("give-classes.html",{subjects, weekdays})

}

async function saveClasses (_req, res){
    const CreateProffy = require("./database/createProffy")

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    const classesValues ={
        subject: req.body.subject,
        cost: req.body.cost
    }
    const classScheduleValue = req.body.weekday.map(
        (weekday, index)  => {

            return{
                weekday,
                time_from: convertHoursToMinutes( req.body.time_from[index]),
                time_to: convertHoursToMinutes (req.body.time_to[index])
            }
        }
    )
    try{
        const db = await Database
        await createProffy(db,{proffyValue, classesValues, classScheduleValue})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch  (error){
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}