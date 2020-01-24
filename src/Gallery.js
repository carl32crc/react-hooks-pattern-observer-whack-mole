import React, { useState, useEffect } from 'react';

import { Square } from './components/Square';
import { galleryController } from './controllers/GalleryController';

import { galleryMockup } from './json/mockup';

import { Modal } from './components/Modal';
import { Input } from './components/Input';

import './Gallery.css'

const { subject } = galleryController;

function Gallery() {
  const [gallery, setGallery] = useState(galleryController.gallery.products);
  const [product, setProduct] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  function onGalleryUpdate(newState) {
    const { products } = newState.gallery;
    setGallery(products);
  }

  useEffect(() => {
    subject.attach(onGalleryUpdate);
    galleryController.setProducts(galleryMockup);
    return () => subject.detach(onGalleryUpdate);
  },[])

  return (
    <React.Fragment>
      <Modal 
        open={isOpen}
        title={product.title}
        closeModal={() => setIsOpen(false)}
      >
        <Input product={product} />
      </Modal>
      <div className="Gallery">
        {gallery.length > 0 && gallery.map(product => 
          <Square 
            key={product.id} 
            product={product} 
            setIsOpen={setIsOpen} 
            setProduct={setProduct} 
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default Gallery;
