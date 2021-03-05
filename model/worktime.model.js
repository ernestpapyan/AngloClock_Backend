const sql = require('./db')
const WorkTime = function (worktime) {
    this.work_location = worktime.work_location;
    this.start_stop = worktime.start_stop;
    this.start_day = worktime.start_day;
    this.end_day = worktime.end_day;
    this.time = worktime.time;
}

WorkTime.addWorkTime = (worktime, result) => {
    sql.query(`INSERT INTO work_time SET ?`, worktime, (err, res) => {
        if (err)
            result(err, null)
        else result(null, { worktime_id: res.insertId })
    })
}

WorkTime.getWorkTime = (result) => {
    sql.query("SELECT * FROM work_time", (err, res) => {
        if (err)
            result(err, null)
        else result(null, res)
    })
}

WorkTime.changeWorkTime = (id, work_location, start_stop, start_day, end_day, time, result) => {
    sql.query(`UPDATE work_time SET work_location='${work_location}', start_stop='${start_stop}', start_day='${start_day}',
    end_day='${end_day}', \`time\`='${time}' WHERE id=${id}
    `, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {updated: id})
    })
}

WorkTime.deleteWorkTime = (id, result) => {
    sql.query(`DELETE FROM work_time WHERE id=${id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {deleted: id})
    })
}

module.exports = WorkTime