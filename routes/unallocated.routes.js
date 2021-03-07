module.exports = app => {
    const Unallocated = require('../controllers/unallocated.controller')

    app.post('/getUnallocatedList', Unallocated.getUnallocatedList)

    app.post('/setUnallocated', Unallocated.setUnallocated)
}