import React, { useEffect } from 'react'

import "./modal.css"
import { IoClose } from 'react-icons/io5'
const Modal = ({ onRequestClose, children, isOpen}) => {


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
  
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [isOpen]);
  

  return isOpen ? (
    <div className='modal-container' onClick={onRequestClose}>
<div className='modal-content' onClick={(e)=> {e.stopPropagation();}}>
    <button className='modal-close-button' onClick={onRequestClose}>
      <IoClose/>
    </button>
    {children}
</div>
    </div>
  ) : null;
}

export default Modal
