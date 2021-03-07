module.exports = app => {
    const History = require('../controllers/history.controller')

    app.post('/check_in', History.check_in)

    app.post('/check_out', History.check_out)

    app.post('/changeInTime', History.changeInTime)

    app.post('/changeOutTime', History.changeOutTime)

    app.post('/setFinished', History.setFinished)

    app.post('/setQuantity', History.setQuantity)

    app.post('/setComment', History.setComment)

    app.post('/setPicture', History.setPicture)

    app.post('/setEstimateTime', History.setEstimateTime)

    app.post('/getPaidBreaksByUserID', History.getPaidBreaksByUserID)

    app.post('/getDetailsByUserID', History.getDetailsByUserID)

    app.post('/getInCount', History.getInCount)

    app.post('/getOutCount', History.getOutCount)

    app.post('/getPaidBreaksCount', History.getPaidBreaksCount)

    app.post('/getBreaksCount', History.getBreaksCount)

    app.post('/getAreaWorkInProgress', History.getAreaWorkInProgress)

    app.post('/getUserWorkInProgress', History.getUserWorkInProgress)

    app.post('/getChangedClock', History.getChangedClock)
}