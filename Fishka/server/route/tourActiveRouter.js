const Router = require('express')

const tourActiveController = require('../controller/tourActiveController')
const router = new Router()

router.post('/', tourActiveController.create)
router.patch('/', tourActiveController.update)
router.get('/', tourActiveController.getAll)

module.exports = router 