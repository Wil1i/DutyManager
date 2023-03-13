const loginButton = document.getElementById("loginButton")
const logoutButton = document.getElementById("logoutButton")
const codePersoneli = document.getElementById("codePersoneli")
const headerText = document.getElementById("nameP")
const passwordSubmitButton = document.getElementById("submitPassword")
const passwordInput = document.getElementById("firstTimePassword")
const passwordAlert = document.getElementById("passwordAlert")
const locker = [document.getElementById("passwordBoxHandler"), document.getElementById("passwordContainer")]

loginButton.addEventListener("click", async () => {
    const loginRequest = await axios.post("/?action=login", {
        codePersoneli : codePersoneli.value
    })

    if(loginRequest.data == ""){
        headerText.style.opacity = 0.2
        setTimeout(() => {
        headerText.innerHTML = "کد پرسنلی نامعتبر"
        headerText.style.color = "red"
        headerText.style.opacity = 1
        }, 200);

        setTimeout(() => {
        headerText.style.opacity = 0.2
        setTimeout(() => {
            headerText.innerHTML = "اپل سرویس"
            headerText.style.color = "black"
            headerText.style.opacity = 1
        }, 200);
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
        passwordAlert.style.opacity = 0.2
        setTimeout(() => {
        passwordAlert.innerHTML = "رمز نامعتبر"
        passwordAlert.style.color = "red"
        passwordAlert.style.opacity = 1
        }, 200);

        setTimeout(() => {
        passwordAlert.style.opacity = 0.2
        setTimeout(() => {
            passwordAlert.innerHTML = "خوش آمدید!"
            passwordAlert.style.color = "black"
            passwordAlert.style.opacity = 1
        }, 200);
        }, 10000);
    }
})

passwordInput.addEventListener("keyup", (event) => {
    if(event.keyCode == 13) passwordSubmitButton.click()
})