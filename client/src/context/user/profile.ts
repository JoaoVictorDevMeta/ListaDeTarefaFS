export function getUserInfo() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}