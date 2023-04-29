import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './GlobalStyles/globalStyles';
import { Wrap } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [imageRequest, setImageRequest] = useState('');

  const onFormSubmit = imageRequest => {
    setImageRequest(imageRequest);
  };

  return (
    <Wrap>
      <GlobalStyle />
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery imageRequest={imageRequest} />
      <ToastContainer autoClose={3000} />
    </Wrap>
  );
};
