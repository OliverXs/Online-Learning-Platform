document.querySelector("#add-time")
.addEventListener("click", cloneField)

function cloneField(){
    const newFieldsContainer = document.querySelector(".schedule-item").cloneNode(true)
    const newFields = newFieldsContainer.querySelectorAll("input")

    newFields.forEach(function(newFields){
        newFields.value=""
    })

    document.querySelector("#schedule-items").appendChild(newFieldsContainer)
}