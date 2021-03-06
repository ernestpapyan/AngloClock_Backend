const History = require('../model/history.model')

exports.check_in = (req, res) => {
    History.check_in(req.body.user_id, req.body.job_id, req.body.date_time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.check_out = (req, res) => {
    History.check_out(req.body.user_id, req.body.job_id, req.body.date_time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}


