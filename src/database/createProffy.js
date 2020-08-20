module.exports = async function(db, {proffyValue, classesValues, classScheduleValue}){
    
    const insertedProffy = await db.run(`
    
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );

    `)
            const proffy_id = insertedProffy.lastID

    const insertedClasses = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES(
            "${classesValues.subject}",
            "${classesValues.cost}",
            "${proffy_id}"
        );
    `)

            const class_id =insertedClasses.lastID
    
    const insertedAllclassScheduleValues = classScheduleValue. map((classScheduleValue)=>{
        return db.run(`
            INSERT INTO class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES(
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"

            );
        
        `)
    })

    await Promise.all(insertedAllclassScheduleValues)  

}