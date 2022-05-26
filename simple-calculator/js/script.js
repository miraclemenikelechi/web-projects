const display = document.querySelector("#display")
const button = document.querySelectorAll("button")
const theme = document.querySelector(".lightTheme")
const calculator = document.querySelector(".calc")
const toggler = document.querySelector(".toggle")

// for calculations
button.forEach(item => {
    item.onclick = () => {
        if (item.id === "clear") {
            display.textContent = "clean screen"
            setTimeout(() => (display.innerText = ""), 1500)
        } else if (item.id === "backspace") {
            let text = display.innerText.toString()
            display.innerText = text.substr(0, text.length - 1)
        } else if (display.innerText != "" && item.id === "equal") {
            display.innerText = eval(display.innerText)
        } else if (display.innerText === "" && item.id === "equal") {
            display.innerText = "invalid syntax"
            setTimeout(() => (display.innerText = ""), 1500)
        } else {
            display.innerText += item.id
        }
    }
})

// for dark theme
let isDark = false

theme.onclick = () => {
    calculator.classList.toggle("light")
    theme.classList.toggle("active")
    isDark = !isDark
    if (isDark === false) {
        toggler.classList.replace("uil-sun", "uil-moon")
    } else if (isDark === true) {
        toggler.classList.replace("uil-moon", "uil-sun")
    }
}