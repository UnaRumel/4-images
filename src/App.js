import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchPictures } from './services/PicturesApi';
import scrollPageDown from './helpers/scrollPageDown';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import NoResult from './components/NoResult';

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchQuery) {
            return;
        }
        const fetchGallery = async () => {
            try {
                const request = await fetchPictures(searchQuery, page);
                if (request.length === 0) {
                    return setError(
                        `No results were found for ${searchQuery}!`,
                    );
                }
                setImages(prev => [...prev, ...request]);
            } catch (error) {
                setError('Something went wrong. Try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, [page, searchQuery]);

    const handlerFormSubmit = searchQuery => {
        setSearchQuery(searchQuery);
        setPage(1);
        setImages([]);
        setError(null);
        setLoading(true);
    };

    const handleOpenModal = largeImage => {
        setLargeImage(largeImage);
        toggleModal();
    };

    const handleOnLoadClick = () => {
        scrollPageDown();
        setLoading(true);
        setPage(prev => prev + 1);
    };

    const toggleModal = () => setShowModal(!showModal);

    const hideLoaderInModal = () => setLoading(false);

    return (
        <>
            <ToastContainer autoClose={3000} />

            <Searchbar onSubmit={handlerFormSubmit} />
            {error && <NoResult text={error} />}
            {loading && (
                <Loader
                    className="spinner"
                    type="Circles"
                    color="#00BFFF"
                    height={300}
                    width={300}
                />
            )}
            {images.length > 0 && !error && (
                <ImageGallery images={images} onOpenModal={handleOpenModal} />
            )}

            {!loading && images.length > 0 && !error && (
                <Button onClick={handleOnLoadClick} />
            )}

            {showModal && (
                <Modal onClose={toggleModal}>
                    {loading && (
                        <Loader
                            className="spinner"
                            type="Circles"
                            color="#00BFFF"
                            height={300}
                            width={300}
                        />
                    )}
                    <img
                        src={largeImage.largeImageURL}
                        alt={largeImage.tags}
                        onLoad={hideLoaderInModal}
                    />
                </Modal>
            )}
        </>
    );
}
