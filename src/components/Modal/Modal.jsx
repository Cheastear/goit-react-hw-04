import PropTypes from "prop-types";

import css from "./Modal.module.css";

const Modal = ({ url, onClose }) => {
  return (
    <Modal onRequestClose={onClose}>
      <a className={css.modal} onClick={onClose}>
        <img src={url} />
      </a>
    </Modal>
  );
};

Modal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
