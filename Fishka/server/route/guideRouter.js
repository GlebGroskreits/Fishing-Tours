const Router = require('express')

const guideController = require('../controller/guideController')
const router = new Router()

router.post('/', guideController.create)
router.put('/', guideController.update)
router.get('/', guideController.getAll)

module.exports = router 