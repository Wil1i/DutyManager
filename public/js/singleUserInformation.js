const resetWorkHours = document.getElementById("resetWorkHours")
const deleteHistory = document.getElementById("deleteHistory")
const deleteUser = document.getElementById("deleteUser")
const codePersoneli = document.getElementById("personeliCode")
const stopWorking = document.getElementById("stopWorking")
const duty = document.getElementById("duty")
const editInformation = document.getElementById("editInformation")
var editContainer = document.getElementById("containerHandler")
var closeBtn = document.getElementById("close")
var morakhasiBtn = document.getElementById("morakhasi")
var morakhasiContainer = document.getElementById("containerHandlerMorakhasi")
var morakhasiCloseBtn = document.getElementById("closeMorakhasi")
var deleteMorakhasiBtn = document.getElementById("delete-morakhasi")

deleteMorakhasiBtn.addEventListener("click", () => {
    axios.post(`/admin/${codePersoneli.textContent}?action=deleteMorakhasi`).then(result => {
        if(result.data == true) location.reload()
    })
})

morakhasiBtn.addEventListener("click", () => {
    morakhasiContainer.style.display = "flex"
})

morakhasiCloseBtn.addEventListener("click", () => {
    morakhasiContainer.style.display = "none"
})

closeBtn.addEventListener("click", () => {
    editContainer.style.display = "none"
})

editInformation.addEventListener("click", () => {
    editContainer.style.display = "flex"
})

stopWorking.addEventListener("click", async () => {
    if(duty.innerHTML == "on"){
        await axios.post(`/?action=logout`, {codePersoneli : codePersoneli.textContent})
    }else if(duty.innerHTML == "off"){
        await axios.post(`/?action=login`, {codePersoneli : codePersoneli.textContent})
    }
    location.reload()
})

resetWorkHours.addEventListener("click", () => {
    axios.post(`/admin/${codePersoneli.textContent}?action=resetWorkHours`).then(result => {
        if(result.data == true) location.reload()
    })
})

deleteHistory.addEventListener("click", () => {
    axios.post(`/admin/${codePersoneli.textContent}?action=deleteHistory`).then(result => {
        if(result.data == true) location.reload()
    })
})

deleteUser.addEventListener("click", () => {
    if(confirm("کاربر مورد نظر حذف شود ؟")){
        axios.post(`/admin/${codePersoneli.textContent}?action=deleteUser`).then(result => {
            if(result.data == true) location.href = "/admin"
        })
    }
})