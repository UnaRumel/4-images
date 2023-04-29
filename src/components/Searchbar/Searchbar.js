import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onFormSubmit }) => {
  const [imageRequest, setImageRequest] = useState('');

  const onInputValue = e => {
    const imageRequest = e.currentTarget.value.toLowerCase();
    setImageRequest(imageRequest);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (imageRequest.trim() === '') {
      return toast.error('Please enter a request');
    }
    onFormSubmit(imageRequest.trim());
    setImageRequest('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <AiOutlineSearch size="32px" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputValue}
          value={imageRequest}
        />
      </SearchForm>
    </Header>
  );
};
