import PropTypes from "prop-types";
import css from "./CustomButton.module.css";

const CustomButton = ({ children, onClick = () => {} }) => {
  return (
    <button onClick={onClick} className={css.button}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;
