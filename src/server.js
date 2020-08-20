
const express = require("express")
const nunjucks = require("nunjucks")
const server = express()
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require("./pages")
const{    
    subjects,
    weekdays,
    getsubject
} = require("./utils/format")


nunjucks.configure("src/views",{
    express: server,
    noCache: true,
})


server
.use(express.urlencoded({ extended:true}))
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(1200)