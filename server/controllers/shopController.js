const {Shop} = require('../models/models')
const ApiError = require('../error/ApiError')

class ShopController {
    async create(req, res){
        const {name} = req.body
        const shop = await Shop.create({name})
        return res.json(shop)
    }

    async getAll(req, res){
        const shops = await Shop.findAll()
        return  res.json(shops)
    }
}
module.exports = new ShopController()