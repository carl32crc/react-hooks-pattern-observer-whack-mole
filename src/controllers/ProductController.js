import { Subject } from './../subject';
import { Product } from './../models/Product';

class ProductController {

    constructor(Product, Subject) {
        this.subject = Subject;
        this.product = Product;
    }

    onChangeTitle(event, product) {
        product.onChangeTitle(event.target.value);
        this.subject.publish(this);
    }

}

export const productController = new ProductController(new Product({ id: '', description: '', title: '', price: '', image: '' }), new Subject());