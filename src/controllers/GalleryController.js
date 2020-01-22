import { Gallery } from '../models/Gallery';
import { Subject } from '../subject';

class GalleryController {
    constructor(Gallery, Subject, OriginalGallery) {
        this.gallery = Gallery;
        this.subject = Subject;
        this.product = {id: '', description: '', title: '', price: '', image: ''};
        this.originalGallery = OriginalGallery;
    }

    setProducts(products) {
        this.gallery.setProducts(products);
        this.subject.publish(this);
    }

    onChangeTitle(event, product) {
        product.onChangeTitle(event.target.value);
        this.product = product;
        this.subject.publish(this);
    }
}

export const galleryController = new GalleryController(new Gallery(), new Subject(), new Gallery());
