import React, { useState, useEffect } from 'react';

import { Square } from './components/Square';
import { galleryController } from './controllers/GalleryController';

import { galleryMockup } from './json/mockup';

import './Gallery.css'

const { subject } = galleryController;

function Gallery() {
  const [gallery, setGallery] = useState(galleryController.gallery.products);

  function onGalleryUpdate(newState) {
    const { products } = newState.gallery;
    setGallery(products);
  }

  useEffect(() => {
    subject.attach(onGalleryUpdate);
    galleryController.setProducts(galleryMockup);
    window.galleryController = galleryController;
    return () => subject.detach(onGalleryUpdate);
  },[])

  return (
    <React.Fragment>
      <div className="Gallery">
        {gallery.length > 0 && gallery.map(product => 
          <Square 
            key={product.id} 
            product={product}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default Gallery;
