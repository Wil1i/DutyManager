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
    }else{
        document.documentElement.style.setProperty('--main-color', 'green');
        showAlert(headerText, "با موفقیت وارد شدید", "اپل سرویس", "green", "black")
        setTimeout(() => {
            document.documentElement.style.setProperty('--main-color', '#2f25e8');
        }, 10000);
    }
})

logoutButton.addEventListener("click", async () => {

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