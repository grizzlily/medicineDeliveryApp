const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, shopId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(info){
                info = JSON.parse(info)
                info.forEach(i => 
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: productId
                    })
                )
            }

            const product = await Product.create({ name, price, shopId, img: fileName })
            return res.json(product)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {shopId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = (page - 1) * limit;
        let products;
        if(!shopId){
            products = await Product.findAndCountAll({limit, offset})
        } else {
            products = await Product.findAndCountAll({ where: { shopId }, limit, offset});
        }

        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }
}
module.exports = new ProductController()