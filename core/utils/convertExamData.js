const date = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp._seconds * 1000)
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const month = months[a.getMonth()]
    const date = a.getDate()
    return `${date} ${month}`
}

const fullDate = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp._seconds * 1000)
    const year = a.getFullYear()
    return `${date(UNIX_timestamp)} ${year}`
}

const time = (UNIX_timestamp) => {
    // console.log(UNIX_timestamp)
    const a = new Date(UNIX_timestamp._seconds * 1000)
    // console.log(a)
    const hour = a.getHours()
    const min = a.getMinutes()
    return `${hour}:${("0" + min).slice(-2)}`
}

const duration = (sessions) => {
    let count = 0
    for (const session of sessions) {
        count += session.duration
    }
    return count
}

const size = (sessions) => {
    let count = 0
    for (const session of sessions) {
        count += session.size
    }
    return count
}

const withPicker = (UNIX_timestamp) => {
    // console.log(UNIX_timestamp)
    const a = new Date(UNIX_timestamp._seconds * 1000)
    // console.log(a)
    const yyyy = a.getFullYear()
    const MM = a.getMonth()
    const dd = a.getDate()
    const hh = a.getHours()
    const mm = a.getMinutes()
    // console.log(a.getTimezoneOffset())
    const make2 = (val) => ("0" + val).slice(-2)
    return `${yyyy}-${make2(MM)}-${make2(dd)}T${make2(hh)}:${make2(mm)}`
}

export default {
    date,
    fullDate,
    time,
    duration,
    size,
    withPicker
}