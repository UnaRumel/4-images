import { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { Backdrop, ModalImage } from './Modal.styled';

export const Modal = ({ onClose, largeImage, tags }) => {
  useEffect(() => {
    const handleClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClick);

    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  }, [onClose]);

  return (
    <Backdrop onClick={onClose}>
      <ModalImage src={largeImage} alt={tags} />
    </Backdrop>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};
