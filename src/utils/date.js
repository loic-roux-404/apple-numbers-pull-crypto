/**
 * Get friendly date string
 * 
 * @param {Date} date 
 */
export const friendlyDate = (date) => {
    return `${date.getHours()}:${date.getMinutes()} - ` +
        `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`
}