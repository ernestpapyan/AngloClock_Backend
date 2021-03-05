const Job = require('../model/job.model.js')

exports.addJob = (req, res) => {
    if (!req.body)
        res.status(500).send({
            message: "Content can not be empty!"
        })
    const job = new Job({
        area_id: req.body.area_id,
        job_name: req.body.job_name,
        sub_job: req.body.sub_job,
        priority: req.body.priority,
        date: req.body.date,
        live: req.body.live,
        quantity: req.body.quantity,
        unit: req.body.unit,
        quantity_per_hour: req.body.quantity_per_hour,
        rate_type: req.body.rate_type,
        rate: req.body.rate
    })

    Job.addJob(job, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.getJob = (req, res) => {
    Job.getJob((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.changeJob = (req, res) => {
    Job.changeJob(req.body.job_id, req.body.area_id, req.body.job_name, req.body.sub_name, req.body.priority, req.body.date, req.body.live,
        req.body.quantity, req.body.unit, req.body.quantity_per_hour, req.body.rate_type, req.body.rate, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message
                })
            else
                res.send(data)
        }
    )
}

exports.deleteJob = (req, res) => {
    Job.deleteJob(req.body.job_id, (err, data) => {
        if (err)
            req.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}