
export function getUnixTS(date: Date | string | number = new Date()) {
    return Math.floor(new Date(date).getTime() / 1000)
}
