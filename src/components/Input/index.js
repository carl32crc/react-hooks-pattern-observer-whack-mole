import React from 'react';

export const Input = ({product, onChange}) => {
    return <input 
      value={product.title} 
      onChange={onChange}
    />
}