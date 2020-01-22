import React from 'react';
import './style.css';

export const Modal = ({ title, open, closeModal, children }) => {
  return open ?  
    <div className='modal-container'>
        <div className='modal-background'></div>
        <div className='modal-card'>
        <div className='modal-header'>
            {title}
            <span onClick={() => closeModal()} > X </span>
        </div>
          {children}
        </div>
    </div> : null
}