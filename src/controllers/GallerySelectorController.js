import { GallerySelection } from '../models/GallerySelection';
import { Subject } from '../subject';

class GallerySelectionController {
    constructor(GallerySelection, Subject) {
        this.gallerySelection = GallerySelection;
        this.subject = Subject;
        this.product = {};
        this.handleChange = this.handleChange;
    }

    handleChange(product) {

        this.subject.publish(this);
    }

    handleProduct(product) {
        this.gallerySelection.handleProduct(product);
        this.subject.publish(this);
    }
}

export const gallerySelectionController = new GallerySelectionController(new GallerySelection(), new Subject());
