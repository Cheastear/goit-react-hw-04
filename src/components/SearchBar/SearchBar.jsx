import toast, { Toaster } from "react-hot-toast";

import PropTypes from "prop-types";
import css from "./SearchBar.module.css";
import CustomButton from "../CustomButton/CustomButton";

const Header = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.searchBar.value.trim() == "") {
      toast.error("This didn't work.");
      return;
    }
    onSearch(e.target.elements.searchBar.value);

    e.target.reset();
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.textInput}
          type="text"
          name="searchBar"
          placeholder="Search images and photos"
        />
        <CustomButton type="submit">Search</CustomButton>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
};

export default Header;
