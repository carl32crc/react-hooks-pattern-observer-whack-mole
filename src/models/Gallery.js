import { Product } from './Product';

export class Gallery {
    
    constructor() {
        this.products = [];
        this.originProducts = [];
    }

    setProducts(products) {
        this.products = this._setProducts(products);
        this.originProducts = this._setProducts(products);
    }

    _setProducts(products) {
        return products.map(product => new Product(product));
    }
}