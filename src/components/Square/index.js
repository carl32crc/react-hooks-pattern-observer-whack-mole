import React, { useEffect } from 'react';
import { productController } from './../../controllers/ProductController';

const { subject } = productController;

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

export const Square = ({ product, setIsOpen, setProduct }) => {
  
  const forceRenderer = useForceRerender();
  
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
      <div 
        style={{width: '500px', height: '300px'}} 
        onClick={() => {
          setProduct(product);
          setIsOpen(true);
        }}>
        
        <img src={product.image } style={{width: '100%', height: '100px'}} alt='queqowiue'/>
        <h2>{product.title }</h2>
        <p>{product.description }</p>
      </div>
    </React.Fragment>
    )
}