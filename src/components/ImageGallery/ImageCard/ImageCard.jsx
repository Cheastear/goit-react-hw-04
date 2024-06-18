import PropTypes from "prop-types";

const ImageCard = ({ elem }) => {
  return (
    <>
      <img src={elem.urls.small} alt={elem.slug} />
    </>
  );
};

ImageCard.propTypes = {
  elem: PropTypes.object,
};

export default ImageCard;
