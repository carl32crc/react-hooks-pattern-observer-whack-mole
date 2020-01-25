import React, { useState } from 'react';
import { Modal } from './../Modal'
import { Input } from './../Input'

const useForceRerender = () => React.useReducer(x => x + 1, 0)[1]

export const Square = ({ product }) => {
  const forceRenderer = useForceRerender();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <React.Fragment>
      {isOpen && 
        <Modal 
          open={isOpen}
          title={product.title}
          closeModal={() => {
            setIsOpen(false)
          }}
        >
          <Input 
            value={product.title}
            onChange={(event) => {
              product.onChangeTitle(event.target.value);
              forceRenderer();
            }}
          />
        </Modal>
      }
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