const sql = require('./db.js');

const Job = function (job) {
    this.area_id = job.area_id;
    this.job_name = job.job_name;
    this.sub_job = job.sub_job;
    this.priority = job.priority;
    this.date = job.date;
    this.live = job.live;
    this.quantity = job.quantity;
    this.unit = job.unit;
    this.quantity_per_hour = job.quantity_per_hour;
    this.rate_type = job.rate_type;
    this.rate = job.rate;
}

Job.addJob = (newJob, result) => {
    sql.query(`INSERT INTO job SET ?`, newJob, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {job_id: res.insertId})
    })
}

Job.getJob = (result) => {
    sql.query(`SELECT * FROM job`, (err, res) => {
        if (err)
            result(err, null)
        else result(null, res)
    })
}

Job.changeJob = (job_id, area_id, job_name, sub_job, priority, date, live, quantity, unit, quantity_per_hour, rate_type, rate, result) => {
    sql.query(`UPDATE job SET area_id=${area_id}, job_name='${job_name}', sub_job='${sub_job}', 
    \`priority\`=${priority}, \`date\`='${date}', live=${live}, quantity=${quantity}, \`unit\`=${unit},
    quantity_per_hour=${quantity_per_hour}, rate_type='${rate_type}', \`rate\`=${rate} WHERE job_id=${job_id}
    `, (err, res) => {
        if (err)
            result(err, null)
        else result(null, {updated: job_id})
    })
}

Job.deleteJob = (job_id, result) => {
    sql.query(`DELETE FROM job WHERE job_id=${job_id}`, (err, res) => {
        if (err)
            result(err, null)
        else
            result(null, {deleted: job_id})
    })
}

module.exports = Job