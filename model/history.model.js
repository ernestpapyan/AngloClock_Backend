const sql = require('./db')
const moment = require('moment')

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
    sql.query(`UPDATE history SET out_datetime='${date_time}', isChanged=0 WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, res)
    })
}

History.changeInTime = (user_id, job_id, date_time, result) => {
    sql.query(`UPDATE history SET changed_inTime='${date_time}', isChanged=1 WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, res)
    })
}

History.changeOutTime = (user_id, job_id, date_time, result) => {
    sql.query(`UPDATE history SET changed_outTime='${date_time}', isChanged=2 WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, res)
    })
}

History.setFinished = (user_id, job_id, date_time, result) => {
    sql.query(`UPDATE history SET finished_datetime='${date_time}', status='finished' WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {updated: 1})
    })
}

History.setUnallocated = (user_id, start_datetime, end_datetime, result) => {
    sql.query(`INSERT INTO unallocate (user_id, start_datetime, end_datetime) VALUES (${user_id}, '${start_datetime}', '${end_datetime}')`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {unallocated: res.insertId})
    })
}

History.setQuantity = (user_id, job_id, quantity, result) => {
    sql.query(`UPDATE history SET quantity=${quantity} WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {updated: 1})
    })
}

History.setComment = (user_id, job_id, comment, result) => {
    sql.query(`UPDATE history SET comment='${comment}' WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {updated: 1})
    })
}

History.setPicture = (user_id, job_id, picture_url, result) => {
    sql.query(`UPDATE history SET picture='${picture_url}' WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {updated: 1})
    })
}

History.setEstimateTime = (user_id, job_id, estimate_time, result) => {
    sql.query(`UPDATE history SET estimate_time=${estimate_time} WHERE user_id=${user_id} AND job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {updated: 1})
    })
}

History.getPaidBreaksByUserID = (user_id, start_date, end_date, result) => {

    const getHours = async (res) => {
        let total_hours = 0
        for (r in res) {
            var start_date = moment(r.start_date)
            var end_date = moment(r.end_date)
            var duration = moment.duration(end_date.diff(start_date))
            var hours = duration.asHours()
            total_hours += hours
            console.log("total_hours=>", total_hours)
        }
        return total_hours
    }

    sql.query(`SELECT * FROM \`break\` WHERE user_id=${user_id} AND (start_datetime BETWEEN '${start_date}' AND '${end_date}') AND (end_datetime BETWEEN '${start_date}' AND '${end_date}')
    `, async (err, res) => {
        if (err)
            result(err, null)
        else if (res.length > 0) {
            let count = res.length;
            let total_hours = await getHours(res)
            result(null, {
                count: count,
                times: total_hours
            })
        }
    })
}

History.getDetailsByUserID = (user_id, start_date, end_date, result) => {
    sql.query(`SELECT j.job_name, a.name, h.in_datetime, h.out_datetime, j.rate_type, j.rate, b.* FROM history h 
LEFT JOIN job j ON h.job_id=j.job_id 
LEFT JOIN area a ON j.area_id=a.area_id
LEFT JOIN break b ON h.paid_break=b.id
WHERE (j.date BETWEEN '${start_date}' AND '${end_date}') AND h.user_id=${user_id}`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res)
    })
}

History.getInCount = (result) => {
    sql.query(`SELECT COUNT(*) as in_count FROM history WHERE out_datetime=0`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res[0])
    })
}

History.getOutCount = (result) => {
    sql.query(`SELECT COUNT(*) as out_count FROM history WHERE out_datetime!=0`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res[0])
    })
}

History.getPaidBreaksCount = (result) => {
    sql.query(`SELECT COUNT(*) as paid_breaks_count FROM break WHERE isPaid=1`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res[0])
    })
}

History.getBreaksCount = (result) => {
    sql.query(`SELECT COUNT(*) as breaks_count FROM break WHERE isPaid=0`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res[0])
    })
}

History.getAreaWorkInProgress = (result) => {
    sql.query(`SELECT COUNT(*) as people_count, a.name, j.job_id, j.job_name, h.estimate_time, h.in_datetime FROM HISTORY h 
    LEFT JOIN job j ON j.job_id=h.job_id 
    LEFT JOIN AREA a ON a.area_id=j.area_id 
    GROUP BY j.job_id`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, res)
    })
}

History.getUserWorkInProgress = (result) => {
    sql.query(`SELECT u.name AS user_name, a.name AS area_name, j.job_id, j.job_name, h.estimate_time, h.in_datetime FROM history h 
LEFT JOIN job j ON j.job_id=h.job_id 
LEFT JOIN area a ON a.area_id=j.area_id 
LEFT JOIN user u ON h.user_id=u.user_id
GROUP BY u.user_id`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res)
    })
}

History.getChangedClock = (start_date, end_date, result) => {
    var data = []
    sql.query(`SELECT u.name, h.in_datetime, h.changed_inTime FROM history h 
    LEFT JOIN user u ON u.user_id=h.user_id WHERE h.isChanged=1 AND (h.changed_inTime BETWEEN '${start_date}' AND '${end_date}')`, (err, res) => {
        if (err)
            result(err, null)
        else {
            data.push(res);
            sql.query(`SELECT u.name, h.out_datetime, h.changed_outTime FROM history h 
    LEFT JOIN user u ON u.user_id=h.user_id WHERE h.isChanged=2 AND (h.changed_outTime BETWEEN '${start_date}' AND '${end_date}')`, (error, response) => {
                if (error)
                    result(error, null)
                else {
                    data.push(response)
                    result(null,data)
                }

            })
        }

    })
}

module.exports = History