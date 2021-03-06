const sql = require('./db')

const History = function (history) {
    this.id = history.id;
    this.user_id = history.user_id;
    this.job_id = history.job_id;
    this.in_datetime = history.in_datetime;
    this.out_datetime = history.out_datetime;
    this.paid_break = history.paid_break;
    this.break = history.break;
    this.status = history.status;
    this.quantity = history.quantity;
    this.comment = history.comment;
    this.picture = history.picture;
    this.estimate_time = history.estimate_time
}

History.check_in = (user_id, job_id, date_time, result) => {
    sql.query(`INSERT INTO history (user_id, job_id, in_datetime) VALUES (${user_id}, ${job_id}, '${date_time}')`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {check_in: res.insertId})
    })
}

History.check_out = (user_id, job_id, date_time, result) => {
    sql.query(`UPDATE history SET out_datetime='${date_time}' WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, res)
    })
}

History.setFinished = (user_id, job_id, date_time, result) => {
    sql.query(`UPDATE history SET finished_datetime='${date_time}' WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {updated: 1})
    })
}

History.setUnallocated = (user_id, date, start_time, end_time, result) => {
    sql.query(`INSERT INTO unallocate (user_id, day, start_time, end_time) VALUES (${user_id}, '${date}', '${start_time}', '${end_time}')`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {unallocated: res.insertId})
    })
}

module.exports = History