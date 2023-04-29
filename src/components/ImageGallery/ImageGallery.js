import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { ImagesList, Button, Item } from './ImageGallery.styled';

const API_KEY = '29578283-f288e571e878ef9103bc84709';
const BASE_URL = 'https://pixabay.com/api/?';

export const ImageGallery = ({ imageRequest }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [largeImage, setLargeImage] = useState(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (imageRequest.trim() !== '') {
      setIsLoading(true);
      setImages([]);
      fetch(
        `${BASE_URL}q=${imageRequest}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => r.json())
        .then(images => {
          setPage(1);
          const total = images.totalHits - 12;
          if (images.hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            setImages([]);
            setIsLoading(false);
            return;
          }
          setImages(images.hits);
          setIsLoading(false);
          setTotal(total);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRequest]);

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
    }

    fetch(
      `${BASE_URL}q=${imageRequest}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(r => r.json())
      .then(picture => {
        if (total < 0) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
          setIsLoading(false);
        }
        if (page > 1) {
          setImages([...images, ...picture.hits]);
          setIsLoading(false);
          setTotal(total - 12);
          console.log(total);
          return;
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = largeImage => {
    setIsModal(true);
    setLargeImage(largeImage);
  };

  const closeModal = () => setIsModal(false);

  return (
    <>
      <ImagesList>
        {!imageRequest && <p>Please enter a request</p>}
        {images &&
          images.map(images => (
            <Item key={images.id}>
              <ImageGalleryItem images={images} onClick={openModal} />
            </Item>
          ))}
      </ImagesList>
      {isLoading && <Loader />}
      {isModal && <Modal largeImage={largeImage} onClose={closeModal} />}
      {images.length > 0 && (
        <Button type="button" onClick={onLoadMore}>
          Load more...
        </Button>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  imageRequest: PropTypes.string.isRequired,
};
