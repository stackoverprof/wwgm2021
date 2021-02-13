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
    const a = new Date(UNIX_timestamp._seconds * 1000)
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

export default {
    date,
    fullDate,
    time,
    duration,
    size
}