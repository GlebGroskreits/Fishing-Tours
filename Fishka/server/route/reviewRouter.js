const Router = require('express')

const reviewController = require('../controller/reviewController')
const router = new Router()

router.post('/', reviewController.create)
router.get('/', reviewController.getAll)

module.exports = router 