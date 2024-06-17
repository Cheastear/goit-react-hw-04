//

import { useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import CustomButton from "./components/CustomButton/CustomButton";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Modal from "./components/Modal/Modal";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState("");

  const handleSubmit = async (filter) => {
    setIsSearching(true);
    setIsError(false);
    setLoadMore(false);

    setFilter(filter);

    try {
      await axios
        .get(`https://api.unsplash.com/photos/random`, {
          params: {
            query: filter,
            client_id: "Z2VtDNiPzyg5YK8n6paZQDRC99TSBDd-5IPi_NfkIw8",
            count: 12,
            orientation: "landscape",
          },
        })
        .then((response) => {
          setGallery(response.data);
        });

      setLoadMore(true);
    } catch (error) {
      setGallery([]);
      setIsError(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    setIsSearching(true);
    setIsError(false);
    setLoadMore(false);

    try {
      await axios
        .get(`https://api.unsplash.com/photos/random`, {
          params: {
            query: filter,
            client_id: "Z2VtDNiPzyg5YK8n6paZQDRC99TSBDd-5IPi_NfkIw8",
            count: 12,
            orientation: "landscape",
          },
        })
        .then((response) => {
          setGallery([...gallery, ...response.data]);
        });

      setLoadMore(true);
    } catch (error) {
      setGallery([]);
      setIsError(true);
    } finally {
      setIsSearching(false);
    }
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

      {modal != "" && <Modal url={modal} onClose={onCloseModal} />}

      {loadMore && (
        <CustomButton onClick={handleLoadMore}>LoadMore</CustomButton>
      )}
    </>
  );
}

export default App;
