

export class Product {
    
    constructor({ id, description, title, price, image }) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.price = price;
        this.image = image;
        this.onChangeTitle = this.onChangeTitle;
        this.getProduct = this.getProduct;
        this.clearProduct = this.clearProduct;
    }

    onChangeTitle(title) {
        this.title = title;
    }

    getProduct() {
        return this;
    }

    setProduct({ id, description, title, price, image }) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.price = price;
        this.image = image;
    }

    reset({ id, description, title, price, image }) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.price = price;
        this.image = image;
    }

    clearProduct() {
        this.id = '';
        this.description = '';
        this.title = '';
        this.price = '';
        this.image = '';
    }
}