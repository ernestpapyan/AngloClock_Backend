module.exports = app => {
    const WorkTime = require('../controllers/worktime.controller')

    app.post('/addWorkTime', WorkTime.addWorkTime)

    app.post('/getWorkTime', WorkTime.getWorkTime)

    app.post('/changeWorkTime', WorkTime.changeWorkTime)

    app.post('/deleteWorkTime', WorkTime.deleteWorkTime)
}