const Router = require('express')

const userController = require('../controller/userController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/', userController.getOne)
router.patch('/', userController.change)

module.exports = router 