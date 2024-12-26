const Router = require('express')

const requestController = require('../controller/requestController')
const router = new Router()

router.post('/', requestController.create)
router.get('/', requestController.getAll)

module.exports = router 