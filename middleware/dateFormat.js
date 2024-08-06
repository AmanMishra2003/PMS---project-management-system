const date = require('date-and-time')


module.exports.formatDate = (d)=>{
    const dateToBeformated = new Date(d)
    return date.format(dateToBeformated, 'YYYY-MM-DD')
}
