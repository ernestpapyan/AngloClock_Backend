module.exports = app => {
    const Job = require('../controllers/job.controller')

    app.post('/addJob', Job.addJob)

    app.post('/getJob', Job.getJob)

    app.post('/changeJob', Job.changeJob)

    app.post('/deleteJob', Job.deleteJob)
}
