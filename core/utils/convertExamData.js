const date = (value) => {
    const a = new Date(value)
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const month = months[a.getMonth()]
    const date = a.getDate()
    return `${date} ${month}`
}

const fullDate = (value) => {
    const a = new Date(value)
    const year = a.getFullYear()
    return `${date(value)} ${year}`
}

const time = (value, additional = false) => {
    const a = new Date(value)
    const extraTime = additional ? 3 : 0
    const hour = a.getHours() + extraTime
    const min = a.getMinutes()
    return `${hour}:${('0' + min).slice(-2)}`
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

const later = (now) => {
    now.setHours(now.getHours() + 5)
    return now.toISOString()
}

export default {
    date,
    fullDate,
    time,
    duration,
    size,
    viewLocal,
    later
}