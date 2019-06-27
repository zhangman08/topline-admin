const localStirage = window.localStorage
const USER_KEY = 'user_info'
// export 用来导出多个成员
export function getUser () {
    return JSON.parse(localStirage.getItem(USER_KEY))
}
export function saveUser (data) {
    localStirage.setItem(USER_KEY, JSON.stringify(data))
}
export function removeUser () {
    localStirage.removeItem(USER_KEY)
}
