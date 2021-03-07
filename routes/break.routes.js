module.exports = app => {
    const Breaking = require('../controllers/break.controller')

    app.post('/paidBreak', Breaking.paidBreak)

    app.post('/break', Breaking.notPaidBreak)

    app.post('/getPaidBreak', Breaking.getPaidBreak)
}