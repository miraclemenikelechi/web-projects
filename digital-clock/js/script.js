// declaring variables
const Time = document.getElementById("showTime")
let is24hour = false
const changeTime = document.getElementById("12HourClock")
// using the 12 hour clock display
const showTime = () => {
    let time = new Date()
    let hour = String(time.getHours())
    let minute = String(time.getMinutes())
    let second = String(time.getSeconds())
    // adding 0 when timer crosses 59
    let hours = hour.length
    let minutes = minute.length
    let seconds = second.length
    if (hours === 1) {
        hour = "0" + hour
    }
    if (minutes < 2) {
        minute = "0" + minute
    }
    if (seconds < 2) {
        second = "0" + second
    }
    console.log(is24hour, hour);
    if (is24hour === true) {
        Time.innerHTML = hour + ":" + minute + ":" + second
    } else {
        am = hour < 12 ? "am" : "pm"
        pm = hour % 12
        Time.innerHTML = pm + ":" + minute + ":" + second + am
    }
}
// user wanting time to be 24 hours
const amPM = changeTime.addEventListener("click", () => {
    is24hour = !is24hour
    if (changeTime.innerHTML === "Turn 24 Hour Clock On") {
        changeTime.innerHTML = "Turn 24 Hour Clock Off"
    } else {
        changeTime.innerHTML = "Turn 24 Hour Clock On"
    }
})
showTime()
setInterval(showTime, 1000)