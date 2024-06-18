import PropTypes from "prop-types";
import Modal from "react-modal";

import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ url, onClose }) => {
  return (
    <Modal
      isOpen={url != ""}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closeButton} onClick={onClose}>
        x
      </button>
      <img src={url} className={css.image} alt="Modal content" />
    </Modal>
  );
};

ImageModal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
