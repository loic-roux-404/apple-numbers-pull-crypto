/**
 * Get friendly date string
 * 
 * @param {Date} date 
 */
export const friendlyDate = (date) => {
    return `${date.getHours()}:${date.getUTCMinutes()}` +
        `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`
}