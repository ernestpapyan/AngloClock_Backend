module.exports = app => {
    const History = require('../controllers/history.controller')

    app.post('/check_in', History.check_in)

    app.post('/check_out', History.check_out)
}