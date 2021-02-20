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

const viewLocal = (value) => {
    const a = new Date(value)
    const z = a.getTimezoneOffset() * 60 * 1000
    const local = new Date(a.getTime() - z)

    return local.toISOString().slice(0,16)
}

export default {
    date,
    fullDate,
    time,
    duration,
    size,
    viewLocal
}