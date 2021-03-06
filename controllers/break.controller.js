const Breaking = require('../model/break.model')

exports.notPaidBreak = (req, res) => {
    Breaking.notPaidBreak(req.body.user_id, req.body.job_id, req.body.start_datetime, req.body.end_datetime, req.body.reason, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.paidBreak = (req, res) => {
    Breaking.paidBreak(req.body.user_id, req.body.job_id, req.body.start_datetime, req.body.end_datetime, req.body.reason, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}