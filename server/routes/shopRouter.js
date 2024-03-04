const Router = require('express')
const router = new Router()
const shopController = require('../controllers/shopController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), shopController.create)
router.get('/', shopController.getAll)

module.exports = router