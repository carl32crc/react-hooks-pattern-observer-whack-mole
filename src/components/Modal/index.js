import React from 'react';
import Portal from './../Portal';
import './style.css';

export const Modal = ({ title, open, closeModal, children }) => (
   open 
    ? 
      <Portal id='modal'>
        <div className='modal-container'>
          <div className='modal-background'></div>
          <div className='modal-card'>
            <div className='modal-header'>
              {title}
              <span onClick={() => closeModal()} > X </span>
            </div>
            {children}
          </div>
        </div>
      </Portal> 
    : null
)