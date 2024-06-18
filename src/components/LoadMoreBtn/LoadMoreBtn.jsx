import PropTypes from "prop-types";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ children, onClick = () => {} }) => {
  return (
    <button onClick={onClick} className={css.button}>
      {children}
    </button>
  );
};

LoadMoreBtn.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default LoadMoreBtn;
