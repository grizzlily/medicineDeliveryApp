import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createShop = async (shop) => {
    const {data} = await $authHost.post('api/shop', shop)
    return data
}

export const fetchShops = async () => {
    const {data} = await $host.get('api/shop')
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (shopId, page, limit= 5) => {
    const {data} = await $host.get('api/product', {params: {
            shopId, page, limit
        }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}
