const Router = require('express')

const tourController = require('../controller/tourController')
const router = new Router()

router.post('/', tourController.create)
router.post('/gallery', tourController.createGallery)
router.post('/day', tourController.createDay)
router.patch('/', tourController.update)
router.patch('/day', tourController.updateDay)
router.get('/', tourController.getAll)
router.get('/gallery', tourController.getGallery)
router.get('/day', tourController.getAllDay)
router.get('/one', tourController.getOne)

module.exports = router 