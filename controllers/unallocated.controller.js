const Unallocated = require('../model/unallocated.model')

exports.getUnallocatedList = (req, res) => {
    Unallocated.getUnallocatedList(req.body.start_datetime, req.body.end_datetime, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

exports.setUnallocated = (req, res) => {
    Unallocated.setUnallocated(req.body.user_id, req.body.start_datetime, req.body.end_datetime, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else
            res.send(data)
    })
}