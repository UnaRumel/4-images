import errorImage from './oops.jpeg';
import s from './NoResult.module.css';
import PropTypes from 'prop-types';

export default function NoResult({ text }) {
    return (
        <div role="alert" className={s.Wrapper}>
            <img src={errorImage} width="550" alt="no_res" />
            <p text={text} className={s.Text}>
                {text}
            </p>
        </div>
    );
}
NoResult.propTypes = {
    text: PropTypes.string.isRequired,
};
