const date = new Date();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayOfWeek = daysOfWeek[date.getDay()];
const monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentMonthOfYear = monthOfYear[date.getMonth() ]
const currentTime = date.toLocaleTimeString();
const showTime = document.querySelector("h5")
    showTime.innerHTML = currentTime
const fullDay = currentDayOfWeek +","+currentMonthOfYear +" " + date.getDate() +"," + date.getFullYear()
const showDay = document.querySelector("h3")
    showDay.innerHTML = fullDay



