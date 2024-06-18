import PropTypes from "prop-types";

const ImageCard = ({ elem, onClick }) => {
  return (
    <>
      <img
        onClick={() => onClick(elem.urls.regular)}
        src={elem.urls.small}
        alt={elem.slug}
      />
    </>
  );
};

ImageCard.propTypes = {
  elem: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImageCard;
