import { Product } from './Product';

const NUMBER_PRODUCTS = 5;

export class GallerySelection {
  
    constructor() {
        this._setProducts();
    }

    _setProducts() {
        const products = Array(NUMBER_PRODUCTS).fill('')
          .map(() => ({...new Product({ id: '', title: '', description: '', price: '', image: '' })}));
        this.products = products;
    }

    handleProduct(product) {
        this.findProduct(product) 
          ? this.removeProduct(product)
          : this.setProduct(product);
    }

    findProduct(product) {
        return this.products.find(({ id }) => id === product.id);
    }

    removeProduct(product) {
        const _product = this.products.find(({ id }) => product.id === id);
        _product.setProduct({ id: '', description: '', title: '', price: '', image: '' });
    }


    setProduct(product) {
        const _product = this.products.find(({ id }) => id === '');
        if(_product) {
            _product.setProduct(product);
        }
    }
    
}