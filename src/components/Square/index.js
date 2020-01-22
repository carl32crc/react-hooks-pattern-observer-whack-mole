import React, { useEffect, useState, useMemo } from 'react';
import { galleryController } from './../../controllers/GalleryController';

import { Modal } from './../Modal';
import { Input } from './../Input';

const { subject } = galleryController;

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

export const Square = ({ product }) => {
  
  const forceRenderer = useForceRerender();
  const [isOpen, setIsOpen] = useState(false);
  
  const onProductUpdate = (newState) => {
    if(newState.product.id === product.id) {
      forceRenderer();
    }   
  }

  useEffect(() => {
    subject.attach(onProductUpdate);

    return () => subject.detach(onProductUpdate);
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
      <div 
        style={{width: '500px', height: '300px'}} 
        onClick={() => {
            setIsOpen(true);
        }}>
        
        <img src={product.image } style={{width: '100%', height: '100px'}} alt='queqowiue'/>
        <h2>{product.title }</h2>
        <p>{product.description }</p>
    </div>
    </React.Fragment>
    )
}