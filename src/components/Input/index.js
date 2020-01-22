import React from 'react';
import { galleryController } from './../../controllers/GalleryController';

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

export const Input = ({product}) => {
    const forceRenderer = useForceRerender();
    return <input 
      value={product.title} 
      onChange={(event) => {
        galleryController.onChangeTitle(event, product);
        forceRenderer();
    }}
    />
}