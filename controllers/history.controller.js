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

exports.changeInTime = (req, res) => {
    History.changeInTime(req.body.user_id, req.body.job_id, req.body.date_time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.changeOutTime = (req, res) => {
    History.changeOutTime(req.body.user_id, req.body.job_id, req.body.date_time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.setFinished = (req, res) => {
    History.setFinished(req.body.user_id, req.body.job_id, req.body.date_time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}


exports.setQuantity = (req, res) => {
    History.setQuantity(req.body.user_id, req.body.job_id, req.body.quantity, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.setComment = (req, res) => {
    History.setComment(req.body.user_id, req.body.job_id, req.body.comment, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.setPicture = (req, res) => {
    History.setPicture(req.body.user_id, req.body.job_id, req.body.picture_url, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.setEstimateTime = (req, res) => {
    History.setEstimateTime(req.body.user_id, req.body.job_id, req.body.estimate_time, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getPaidBreaksByUserID = (req, res) => {
    History.getPaidBreaksByUserID(req.body.user_id, req.body.start_date, req.body.end_date, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getDetailsByUserID = (req, res) => {
    History.getDetailsByUserID(req.body.user_id, req.body.start_date, req.body.end_date, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.getInCount = (req, res) => {
    History.getInCount((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getOutCount = (req, res) => {
    History.getOutCount((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getPaidBreaksCount = (req, res) => {
    History.getPaidBreaksCount((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getBreaksCount = (req, res) => {
    History.getBreaksCount((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getAreaWorkInProgress = (req, res) => {
    History.getAreaWorkInProgress((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getUserWorkInProgress = (req, res) => {
    History.getUserWorkInProgress((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}

exports.getChangedClock = (req, res) => {
    History.getChangedClock(req.body.start_date, req.body.end_date, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}