export const validateNumber = (value, min = 0, max = 0) => {
    const notBigger = max === 0 ? true : value.length <= max
    const notSmaller = value.length >= min
    const isNumber = value === '' || /^[0-9\b]+$/.test(value)

    return isNumber && notBigger && notSmaller
}

export const validateFormatNoPeserta = (value) => {
    const splits = value.split('-')
    const structure = splits.length === 3
    const isNumber = validateNumber(splits[0], 2, 2) && validateNumber(splits[2], 4, 4)
    const isOnEnum = ['ST', 'SH', 'CP'].includes(splits[1])

    return structure && isNumber && isOnEnum
}