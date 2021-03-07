const sql = require('./db')
const Unallocated = function (unallocated) {
    this.id = unallocated.id;
    this.user_id = unallocated.user_id;
    this.start_datetime = unallocated.start_datetime;
    this.end_datetime = unallocated.end_datetime;
}

Unallocated.getUnallocatedList = (start_datetime, end_datetime, result) => {
    sql.query(`SELECT un.*, u.name FROM unallocate un LEFT JOIN user u ON un.user_id=u.user_id 
    WHERE ((un.start_datetime BETWEEN '${start_datetime}' AND '${end_datetime}') 
    AND (un.end_datetime BETWEEN '${start_datetime}' AND '${end_datetime}'))`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res)
    })
}

Unallocated.setUnallocated = (user_id, start_datetime, end_datetime, result) => {
    sql.query(`INSERT INTO unallocate (user_id, start_datetime, end_datetime) VALUES (${user_id}, '${start_datetime}', '${end_datetime}')`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {unallocated: res.insertId})
    })
}

module.exports = Unallocated