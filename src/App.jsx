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
  const [page, setPage] = useState(1);

  const fetchImages = async (filter, page) => {
    setIsSearching(true);
    setIsError(false);
    setLoadMore(false);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: filter,
            client_id: "Z2VtDNiPzyg5YK8n6paZQDRC99TSBDd-5IPi_NfkIw8",
            per_page: 12,
            page: page,
            orientation: "landscape",
          },
        }
      );

      setGallery((prevGallery) =>
        page != 1
          ? [...prevGallery, ...response.data.results]
          : response.data.results
      );

      if (response.data.results.length == 12) {
        setLoadMore(true);
      }
    } catch (error) {
      setGallery([]);
      setIsError(true);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (filter) {
      fetchImages(filter, page);
    }
  }, [filter, page]);

  const handleSubmit = (filter) => {
    setFilter(filter);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
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
