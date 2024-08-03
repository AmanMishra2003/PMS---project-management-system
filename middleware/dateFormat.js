const date = require('date-and-time')

module.exports.formatDate = (d)=>{
    return date.format(d, 'YYYY-MM-DD')
}
