import React, { useEffect, useState } from 'react';
import { gallerySelectionController } from './../../controllers/GallerySelectorController';

import './style.css';

const { subject } = gallerySelectionController;

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

export const Rectangle = ({ product }) => {
  const forceRenderer = useForceRerender();
  const updateProduct = (newState) => {
    console.log(newState)
    forceRenderer();
  }
  
  useEffect(() => {
    subject.attach(updateProduct);

    return () => subject.detach(updateProduct)
  }, [])

  return (
    <div className="rectangle">
      <h1>{product.title && product.title}</h1>
    </div>
  )
}