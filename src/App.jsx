import { useState, useEffect } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState("");

  const fetchImages = async (filter, append = false) => {
    setIsSearching(true);
    setIsError(false);
    setLoadMore(false);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random`,
        {
          params: {
            query: filter,
            client_id: "Z2VtDNiPzyg5YK8n6paZQDRC99TSBDd-5IPi_NfkIw8",
            count: 12,
            orientation: "landscape",
          },
        }
      );

      setGallery((prevGallery) =>
        append ? [...prevGallery, ...response.data] : response.data
      );
      setLoadMore(true);
    } catch (error) {
      setGallery([]);
      setIsError(true);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (filter) {
      fetchImages(filter);
    }
  }, [filter]);

  const handleSubmit = (filter) => {
    setFilter(filter);
  };

  const handleLoadMore = () => {
    fetchImages(filter, true);
  };

  const handleModal = (urlImg) => {
    setModal(urlImg);
  };

  const onCloseModal = () => {
    setModal("");
  };

  return (
    <>
      <SearchBar onSearch={handleSubmit} />
      <ImageGallery images={gallery} onClick={handleModal} />

      {isSearching && (
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#403EDB"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}

      {isError && (
        <ErrorMessage>
          Whoops, something went wrong! Please try reloading this page!
        </ErrorMessage>
      )}

      {modal && <ImageModal url={modal} onClose={onCloseModal} />}

      {loadMore && (
        <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
      )}
    </>
  );
}

export default App;
