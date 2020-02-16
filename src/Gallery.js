import React, { useState, useEffect } from 'react';

import { Square } from './components/Square';
import { Rectangle } from './components/Rectangle';
import { galleryController } from './controllers/GalleryController';
import { gallerySelectionController } from './controllers/GallerySelectorController';

import { galleryMockup } from './json/mockup';

import './Gallery.css'

const { subject } = galleryController;

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

function Gallery() {
  const forceRenderer = useForceRerender();
  const [gallery, setGallery] = useState(galleryController.gallery.products);
  const [gallerySelection, setGallerySelection] = useState(gallerySelectionController.gallerySelection.products);

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

  const updateProduct = (newState) => {
    console.log('updateProduct', newState)
    const { products } = newState.gallerySelection
    setGallerySelection(products);
    forceRenderer();
  }

  useEffect(() => {
    gallerySelectionController.subject.attach(updateProduct);
    window.gallerySelectionController = gallerySelectionController;
    return () => gallerySelectionController.subject.detach(updateProduct)
  }, [])

  return (
    <React.Fragment>
      <div className="gallery-container">
        <div className="Gallery">
          {gallery.length > 0 && gallery.map(product => 
            <Square 
              key={product.id} 
              product={product}
            />
          )}
        </div>
        <div className="GallerySelector">
         {gallerySelection.map((product, index) => 
           <Rectangle key={index} product={product} />
         )}
            
        </div>
      </div>
    </React.Fragment>
  );
}

export default Gallery;
