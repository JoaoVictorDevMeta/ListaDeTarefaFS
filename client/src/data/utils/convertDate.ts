export function convertDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`;
}