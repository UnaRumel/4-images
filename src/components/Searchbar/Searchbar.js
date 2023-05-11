import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = e => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (searchQuery.trim() === '') {
            return toast.error('Please,enter the correct request!', {
                position: 'top-left',
            });
        }

        onSubmit(searchQuery);
        setSearchQuery('');
    };

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
                <input
                    onChange={handleSearchQueryChange}
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={searchQuery}
                    placeholder="Search images and photos"
                />
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
