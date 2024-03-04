import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._shops = []
        this._products = []
        this._selectedShop = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setShops(shops) {
        this._shops = shops
    }
    setProducts(products) {
        this._products = products
    }

    setSelectedShop(shop) {
        this.setPage(1)
        this._selectedShop = shop
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get shops() {
        return this._shops
    }
    get products() {
        return this._products
    }
    get selectedShop() {
        return this._selectedShop
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
