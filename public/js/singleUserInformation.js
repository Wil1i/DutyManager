const resetWorkHours = document.getElementById("resetWorkHours")
const deleteHistory = document.getElementById("deleteHistory")
const deleteUser = document.getElementById("deleteUser")
const codePersoneli = document.getElementById("personeliCode")

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
    axios.post(`/admin/${codePersoneli.textContent}?action=deleteUser`).then(result => {
        if(result.data == true) location.href = "/admin"
    })
})