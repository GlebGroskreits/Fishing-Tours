const Router = require('express')

//const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const userController = require('../controller/userController')
//const authMiddleware = require('../middleware/authMiddleware') //второй параметр
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

//router.get('/', checkRole('teamlead'), userController.getAll)

module.exports = router 