const WorkTime = require('../model/worktime.model');

exports.addWorkTime = (req, res) => {
    const worktime = new WorkTime({
        work_location: req.body.work_location,
        start_stop: req.body.start_stop,
        start_day: req.body.start_day,
        end_day: req.body.end_day,
        time: req.body.time
    })
    WorkTime.addWorkTime(worktime, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getWorkTime = (req, res) => {
    WorkTime.getWorkTime((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.changeWorkTime = (req, res) => {
    WorkTime.changeWorkTime(req.body.id, req.body.work_location, req.body.start_stop, req.body.start_day, req.body.end_day, req.body.time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.deleteWorkTime = (req, res) => {
    WorkTime.deleteWorkTime(req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}