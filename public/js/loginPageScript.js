const loginButton = document.getElementById("loginButton")
const logoutButton = document.getElementById("logoutButton")
const codePersoneli = document.getElementById("codePersoneli")
const headerText = document.getElementById("nameP")
const passwordSubmitButton = document.getElementById("submitPassword")
const passwordInput = document.getElementById("firstTimePassword")
const passwordAlert = document.getElementById("passwordAlert")
const locker = [document.getElementById("passwordBoxHandler"), document.getElementById("passwordContainer")]

function showAlert(object, text, defaultText, color, defaultColor){
    object.style.opacity = 0.2
    setTimeout(() => {
    object.innerHTML = text
    object.style.color = color
    object.style.opacity = 1
    }, 200);

    setTimeout(() => {
    object.style.opacity = 0.2
    setTimeout(() => {
        object.innerHTML = defaultText
        object.style.color = defaultColor
        object.style.opacity = 1
    }, 200);
    }, 10000);
}

loginButton.addEventListener("click", async () => {
    const loginRequest = await axios.post("/?action=login", {
        codePersoneli : codePersoneli.value
    })

    if(loginRequest.data == ""){
        showAlert(headerText, "کد پرسنلی نامعتبر", "اپل سرویس", "red", "black")
        codePersoneli.value = ""
    }else{
        showAlert(headerText, "با موفقیت وارد شدید", "اپل سرویس", "green", "black")
        codePersoneli.value = ""
    }
})

logoutButton.addEventListener("click", async () => {
    const logoutRequest = await axios.post("/?action=logout", {
        codePersoneli : codePersoneli.value
    })

    if(logoutRequest.data == ""){
        showAlert(headerText, "کد پرسنلی نامعتبر", "اپل سرویس", "red", "black")
        codePersoneli.value = ""
    }else{
        if(logoutRequest.data.includes("not duty")){
            showAlert(headerText, "شما وارد نشده اید", "اپل سرویس", "red", "black")
            codePersoneli.value = ""
        }else if(logoutRequest.data.includes("done")){
            showAlert(headerText, "با موفقیت خارج شدید", "اپل سرویس", "red", "black")
            codePersoneli.value = ""
        }
        
    }
})

passwordSubmitButton.addEventListener("click", async () => {
    const passwordValidation = await axios.post("/?action=password", {
        password : passwordInput.value
    })

    if(passwordValidation.data == "ok"){
        locker[0].style.opacity = 0
        locker[1].style.opacity = 0

        setTimeout(() => {
            locker[0].style.display = "none"
            locker[1].style.display = "none"
            codePersoneli.focus()
        }, 300);
    }else{
        showAlert(passwordAlert, "رمز نامعتبر", "خوش آمدید!", "red", "black")
    }
})

passwordInput.addEventListener("keyup", (event) => {
    if(event.keyCode == 13) passwordSubmitButton.click()
})