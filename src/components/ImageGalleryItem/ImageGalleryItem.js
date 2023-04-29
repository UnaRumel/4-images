import { PropTypes } from 'prop-types';

import { Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick }) => {
  const openModal = () => {
    onClick(images.largeImageURL);
  };
  return (
    <Img src={images.webformatURL} alt={images.tags} onClick={openModal} />
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.object.isRequired,
};
