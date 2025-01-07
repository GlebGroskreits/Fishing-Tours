const Router = require('express')

const requestController = require('../controller/requestController')
const router = new Router()

router.post('/', requestController.create)
router.get('/', requestController.getAll)
router.get('/gud', requestController.getAllGuide)
 
module.exports = router 