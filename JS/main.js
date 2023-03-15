/*
Usar el endpoint: "https://kodemia-24g-default-rtdb.firebaseio.com/{sunombre}/koders/.json"
*/

/*const printKoders = async () => {
    let koders = await getKoders()

    //Aquí viene el código para procesar koders
}*/
let koders

const getKoders = async () => {
    let response = await fetch(
        "https://kodemia-24g-default-rtdb.firebaseio.com/roberto/koders/.json"
    )
    let data = await response.json()
    return data
}

const deleteKoder = async (koderKey) => {
    console.log(`Eliminando ${koderKey}...`)
    let response = await fetch(
        `https://kodemia-24g-default-rtdb.firebaseio.com/roberto/koders/${koderKey}/.json`,
        {method:"DELETE"
    })
    let data = await response.json()
    console.log("Koder eliminado")
    return data
}

const createKoder = async (koderObject) => {
    let response = await fetch(
        "https://kodemia-24g-default-rtdb.firebaseio.com/roberto/koders/.json",{
            method: "POST",
            body: JSON.stringify(koderObject)
        })
    let data = await response.json()
    return data
}

//-----------------------------------------------------------------

let btnForm = document.querySelector("#person-form button")

btnForm.addEventListener("click", async () => {
    let fields = document.querySelectorAll("#person-form input")

    let personObject = {}
    fields.forEach((item) => {
        let property = item.name
        let value = item.value
        personObject[property] = value
        item.value = ""
    })
    await createKoder(personObject)
    createRowTable()
})

const createRowTable = async ()=> {
    let peopleList = document.getElementById("tbody-id")
    peopleList.innerHTML = ""
    
    koders = await getKoders()
    let arrayPeople = Object.keys(koders)

    arrayPeople.forEach(key => {
        let { name, lastname, email } = koders[key]

        let trElement = document.createElement("tr")

        let tdName = document.createElement("td")
        let textName = document.createTextNode(`${name}`)
        tdName.appendChild(textName)

        let tdLastName = document.createElement("td")
        let textLastName = document.createTextNode(lastname)
        tdLastName.appendChild(textLastName)

        let tdEmail = document.createElement("td")
        let textEmail = document.createTextNode(email)
        tdEmail.appendChild(textEmail)

        let tdButton = document.createElement("td")
        let btn = document.createElement("button")
        let textButton = document.createTextNode("Eliminar")
        btn.appendChild(textButton)
        btn.id = key
        tdButton.appendChild(btn)

        trElement.append(tdName, tdLastName, tdEmail, tdButton)
        peopleList.appendChild(trElement)
    });

    let buttons = document.querySelectorAll("#tbody-id button")

        buttons.forEach((itemButton,item) => {
            itemButton.addEventListener("click", async (event) => {
                await deleteKoder(event.target.id)
                createRowTable()
            })
        })
}