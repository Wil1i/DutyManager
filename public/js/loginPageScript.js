const loginButton = document.getElementById("loginButton")
const logoutButton = document.getElementById("logoutButton")
const codePersoneli = document.getElementById("codePersoneli")
const headerText = document.getElementById("nameP")
const passwordSubmitButton = document.getElementById("submitPassword")
const passwordInput = document.getElementById("firstTimePassword")
const passwordAlert = document.getElementById("passwordAlert")
const locker = [document.getElementById("passwordBoxHandler"), document.getElementById("passwordContainer")]

let timeout;

function showAlert(object, text, defaultText, color, defaultColor, profile){
    var profilePicture = document.getElementById("profilePicture")

    clearTimeout(timeout)
    object.style.opacity = 0.2
    setTimeout(() => {
    object.innerHTML = text
    object.style.color = color
    object.style.opacity = 1
    }, 200);

    timeout = setTimeout(() => {
    object.style.opacity = 0.2
    setTimeout(() => {
        object.innerHTML = defaultText
        object.style.color = defaultColor
        object.style.opacity = 1
    }, 200);
    }, 10000);

    // if(profile){
    //     profilePicture.src = `/uploads/${profile}`
    //     profilePicture.style.display = "block"
    //     setTimeout(() => {
    //         profilePicture.style.opacity = "1"
    //         setTimeout(() => {
    //             profilePicture.style.opacity = "0"
    //             setTimeout(() => {
    //                 profilePicture.style.display = "none"
    //             }, 200);
    //         }, 10000);
    //     }, 10);
    // }
}

loginButton.addEventListener("click", async () => {
    const loginRequest = await axios.post("/?action=login", {
        codePersoneli : codePersoneli.value
    })

    if(loginRequest.data == undefined || !loginRequest.data || loginRequest.data == "undefined"){
        showAlert(headerText, "کد پرسنلی نامعتبر", "اپل سرویس", "red", "black")
        codePersoneli.value = ""
        if(codePersoneli.className == "codePersoneliFocus") codePersoneli.className = ""
    }else if(loginRequest.data.isDuty == true){
        showAlert(headerText, `${loginRequest.data.dataValues.firstName} ${loginRequest.data.dataValues.lastName} عزیز، شما وارد شده اید.`, "اپل سرویس", "red", "black")
        codePersoneli.value = ""
        if(codePersoneli.className == "codePersoneliFocus") codePersoneli.className = ""
    }else{
        showAlert(headerText, `${loginRequest.data.dataValues.firstName} ${loginRequest.data.dataValues.lastName} عزیز، خوش آمدید!`, "اپل سرویس", "green", "black", loginRequest.data.dataValues.profile)
        codePersoneli.value = ""
        if(codePersoneli.className == "codePersoneliFocus") codePersoneli.className = ""
    }
})

logoutButton.addEventListener("click", async () => {
    const logoutRequest = await axios.post("/?action=logout", {
        codePersoneli : codePersoneli.value
    })

    if(logoutRequest.data == ""){
        showAlert(headerText, "کد پرسنلی نامعتبر", "اپل سرویس", "red", "black")
        codePersoneli.value = ""
        if(codePersoneli.className == "codePersoneliFocus") codePersoneli.className = ""
    }else{
        if(logoutRequest.data.includes("not duty")){
            showAlert(headerText, "شما وارد نشده اید", "اپل سرویس", "red", "black")
            codePersoneli.value = ""
            if(codePersoneli.className == "codePersoneliFocus") codePersoneli.className = ""
        }else if(logoutRequest.data.includes("done")){
            showAlert(headerText, "با موفقیت خارج شدید", "اپل سرویس", "red", "black")
            codePersoneli.value = ""
            if(codePersoneli.className == "codePersoneliFocus") codePersoneli.className = ""
        }
        
    }

})

passwordSubmitButton.addEventListener("click", async () => {
    var s = document.getElementById("s")
    if(s.requestFullscreen){
        s.requestFullscreen()
    }else if(s.webkitRequestFullscreen){
        s.webkitRequestFullscreen()
    }else if(s.msRequestFullscreen){
        s.msRequestFullscreen()
    }

    const passwordValidation = await axios.post("/?action=password", {
        password : passwordInput.value
    })

    if(passwordValidation.data == "ok"){
        locker[0].style.opacity = 0
        locker[1].style.opacity = 0

        setTimeout(() => {
            locker[0].style.display = "none"
            locker[1].style.display = "none"
            // codePersoneli.focus()
        }, 300);
    }else{
        showAlert(passwordAlert, "رمز نامعتبر", "خوش آمدید!", "red", "black")
    }
})

passwordInput.addEventListener("keyup", (event) => {
    if(event.keyCode == 13) passwordSubmitButton.click()
})