// declare all variables
const passwords = document.querySelectorAll(".password")
const hidePass = document.querySelectorAll(".showHide")
const container = document.querySelector(".container")
const signUp = document.querySelector(".sign")
const logIn = document.querySelector(".log")

// show and hide passwords
hidePass.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        passwords.forEach(password => {
            if (password.type === "password") {
                password.type = "text"
                // dynamic icon on password view
                hidePass.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye")
                })
            } else {
                password.type = "password"
                // dynamic icon on password view
                hidePass.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash")
                })
            }
        })
    })
})

// for signUp and logIn transitions
signUp.addEventListener("click", () => {
    container.classList.add("active")
})
logIn.addEventListener("click", () => {
    container.classList.remove("active")
})