import PropTypes from "prop-types";

const Image = ({ elem }) => {
  return (
    <>
      <img src={elem.urls.small} alt={elem.slug} />
    </>
  );
};

Image.propTypes = {
  elem: PropTypes.object,
};

export default Image;
