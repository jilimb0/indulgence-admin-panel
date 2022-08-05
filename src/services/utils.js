const timeStandartDateFormat = (value, month = 1) => {
  let time = ""
  if (value) {
    let a = new Date(value * 1000),
      // months = [
      //   "01",
      //   "02",
      //   "03",
      //   "04",
      //   "05",
      //   "06",
      //   "07",
      //   "08",
      //   "09",
      //   "10",
      //   "11",
      //   "12",
      // ],
      monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      year = a.getFullYear(),
      // month = months[a.getMonth()],
      monthName = monthNames[a.getMonth()],
      date =
        a.getDate().toString().length === 1 ? "0" + a.getDate() : a.getDate(),
      dayName = dayNames[a.getDay()],
      hour =
        a.getHours().toString().length === 1
          ? "0" + a.getHours()
          : a.getHours(),
      min =
        a.getMinutes().toString().length === 1
          ? "0" + a.getMinutes()
          : a.getMinutes(),
      sec =
        a.getSeconds().toString().length === 1
          ? "0" + a.getSeconds()
          : a.getSeconds()

    time =
      dayName +
      " " +
      monthName +
      " " +
      date +
      " " +
      year +
      " " +
      hour +
      ":" +
      min +
      ":" +
      sec
  }
  return time
}

const timeStampToDateFormat = (value, month = 1) => {
  let time = ""
  if (value) {
    let a = new Date(value * 1000),
      // months = [
      //   "01",
      //   "02",
      //   "03",
      //   "04",
      //   "05",
      //   "06",
      //   "07",
      //   "08",
      //   "09",
      //   "10",
      //   "11",
      //   "12",
      // ],
      monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      year = a.getFullYear(),
      // month = months[a.getMonth()],
      monthName = monthNames[a.getMonth()],
      date =
        a.getDate().toString().length === 1 ? "0" + a.getDate() : a.getDate(),
      hour =
        a.getHours().toString().length === 1
          ? "0" + a.getHours()
          : a.getHours(),
      min =
        a.getMinutes().toString().length === 1
          ? "0" + a.getMinutes()
          : a.getMinutes()
    // sec = (a.getSeconds().toString().length === 1) ? ('0' + a.getSeconds()) : a.getSeconds();

    time = monthName + " " + date + ", " + year + " at " + hour + ":" + min
  }
  return time
}

const userTimeStampToDateFormat = (value, month = 1) => {
  let time = ""
  if (value) {
    let a = new Date(value * 1000),
      monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      year = a.getFullYear(),
      monthName = monthNames[a.getMonth()],
      date =
        a.getDate().toString().length === 1 ? "0" + a.getDate() : a.getDate()

    time = monthName + " " + date + ", " + year
  }
  return time
}

const normalizeDateFormat = (value, month = 1) => {
  const toTimestamp = (year, month, day, hour, minute, second) => {
    let datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
    return datum.getTime() / 1000
  }
  let time = ""
  if (value) {
    let a = new Date(value * 1000),
      months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      year = a.getFullYear(),
      month = months[a.getMonth()],
      date =
        a.getDate().toString().length === 1 ? "0" + a.getDate() : a.getDate()
    time = toTimestamp(year, month, date, 0, 0, 0)
  }
  return time
}

const addTimeToDate = (
  format24 = "00:00",
  timestamp = (Date.now() / 1000) | 0
) => {
  const h = +format24.substr(0, 2)
  const m = +format24.substr(3, 2)
  const t = h * 60 * 60 + m * 60
  const offset = new Date().getTimezoneOffset() * 60
  const newTimestamp = normalizeDateFormat(timestamp) + t + offset
  return newTimestamp
}

const fetchAsBlob = (url) => fetch(url).then((response) => response.blob())

const convertBlobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

export {
  userTimeStampToDateFormat,
  timeStampToDateFormat,
  fetchAsBlob,
  convertBlobToBase64,
  normalizeDateFormat,
  addTimeToDate,
  timeStandartDateFormat,
}
