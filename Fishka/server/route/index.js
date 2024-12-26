const Router = require('express')
const router = new Router()

const tourActiveRouter = require('./tourActiveRouter')
const requestRouter = require('./requestRouter')
const reviewRouter = require('./reviewRouter')
const guideRouter = require('./guideRouter')
const userRouter = require('./userRouter')
const tourRouter = require('./tourRouter')


router.use('/tourActive', tourActiveRouter)
router.use('/request', requestRouter)
router.use('/review', reviewRouter)
router.use('/guide', guideRouter)
router.use('/user', userRouter)
router.use('/tour', tourRouter)


module.exports = router