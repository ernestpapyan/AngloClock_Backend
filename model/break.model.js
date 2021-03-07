const sql = require('./db')
const Breaking = function (breaking) {
    this.id = breaking.id;
    this.user_id = breaking.user_id;
    this.job_id = breaking.job_id;
    this.start_datetime = breaking.start_datetime;
    this.end_datetime = breaking.end_datetime;
    this.reason = breaking.reason;
    this.isPaid = breaking.isPaid;
}

Breaking.notPaidBreak = (user_id, job_id, start_datetime, end_datetime, reason, result) => {
    sql.query(`INSERT INTO \`break\` (user_id, job_id, start_datetime, end_datetime, reason, isPaid) VALUES (${user_id}, ${job_id}, '${start_datetime}', '${end_datetime}', '${reason}', 0)`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
        } else {
            // result(null , { id: res.insertId})
            sql.query(`UPDATE \`history\` SET \`break\`=${res.insertId} WHERE user_id=${user_id} AND job_id=${job_id}`, (error, response) => {
                if (error)
                    result(err, null)
                else
                    result(null, {id: res.insertId})
            })
        }

    })
}

Breaking.paidBreak = (user_id, job_id, start_datetime, end_datetime, reason, result) => {
    sql.query(`INSERT INTO \`break\` (user_id, job_id, start_datetime, end_datetime, reason, isPaid) VALUES (${user_id}, ${job_id}, '${start_datetime}', '${end_datetime}', '${reason}', 1)`, (err, res) => {
        if (err)
            result(err, null)
        else
            // result(null , { id: res.insertId})
            sql.query(`UPDATE \`history\` SET \`paid_break\`=${res.insertId} WHERE user_id=${user_id} AND job_id=${job_id}`, (error, response) => {
                if (error)
                    result(err, null)
                else
                    result(null, {id: res.insertId})
            })
    })

}

Breaking.getPaidBreak = (start_date, end_date, result) => {
    sql.query(`SELECT b.*, u.name FROM break b 
    LEFT JOIN user u ON u.user_id=b.user_id 
    WHERE isPaid = 1 AND ((start_datetime BETWEEN '${start_date}' AND '${end_date}') 
    AND (end_datetime BETWEEN '${start_date}' AND '${end_date}'))`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res)
    })
}
module.exports = Breaking;