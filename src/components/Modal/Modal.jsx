import PropTypes from "prop-types";

import css from "./Modal.module.css";

const Modal = ({ url, onClose }) => {
  return (
    <a className={css.modal} onClick={onClose}>
      <img src={url} />
    </a>
  );
};

Modal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
