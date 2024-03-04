const Router = require('express')
const router = new Router()

const productRouter = require('./productRouter')
const shopRouter = require('./shopRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/shop', shopRouter)
router.use('/product', productRouter)

module.exports = router
