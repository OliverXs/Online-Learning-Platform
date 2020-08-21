const subjects = [
    "Artes",
    "Biologia",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
    "Redação",
    "Sociologia"
]
const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
]

function convertHoursToMinutes(time){
    const [hour, minutes]  = time.split(":")

    return number((hour * 60) + minutes)
}

function getsubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

module.exports = {
    subjects,
    weekdays,
    getsubject,
    convertHoursToMinutes
}