const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')
const generateJwt = (id, name, email, phone, address, role) => {
    return jwt.sign(
        { id, name, email, phone, address, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}
class UserController {
    async registration(req, res, next) {
        const { name, email, phone, address, password, role } = req.body
        if (!name || !email || !phone || !address || !password) {
            return next(ApiError.badRequest('Data entered incorrectly.'))
        }
        const candidateEmail = await User.findOne({ where: { email } })
        if (candidateEmail) {
            return next(ApiError.badRequest("User with this email already exists."))
        }
        const candidatePhone = await User.findOne({where: {phone}})
        if(candidatePhone){
            return next(ApiError.badRequest("User with this phone already exists."))
        }

        const hasPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ name, email, role, phone, address, password: hasPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.name, user.email, user.phone, user.address, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('User with this name not found.'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Incorrect password provided."))
        }
        const token = generateJwt(user.id, user.name, user.email, user.phone, user.address, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.phone, req.user.address, req.user.role)
        return res.json({token})
    }
}
module.exports = new UserController()