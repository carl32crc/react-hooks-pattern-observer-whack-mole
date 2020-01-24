import React from 'react';
import { productController } from './../../controllers/ProductController';

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

export const Input = ({product}) => {
    const forceRenderer = useForceRerender();
    return <input 
      value={product.title} 
      onChange={(event) => {
        productController.onChangeTitle(event, product);
        productController.setProduct(product);
        forceRenderer();
    }}
    />
}