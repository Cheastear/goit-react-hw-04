import PropTypes from "prop-types";

import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map((elem) => {
        return (
          <li className={css.item} key={elem.id}>
            <ImageCard elem={elem} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};

export default ImageGallery;
