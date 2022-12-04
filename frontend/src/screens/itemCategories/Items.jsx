import React, { useEffect, useState } from "react";
import CategoryItem from "../../components/categoryItem/CategoryItem";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/modal/Modal";
import { deleteCategoryItem, getCategoryItems } from "../../network/network";
import "./Items.css";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = item => {
    setModalOpen(true);
    setSelectedItem(item);
  };
  const fetchData = () => {
    getCategoryItems()
      .then(res => {
        console.log(res.data);
        setItems(res?.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onDelete = () => {
    deleteCategoryItem(selectedItem?._id)
      .then(res => {
        fetchData();
        closeModal();
        setMessage({ success: "Item deleted successfully" });
      })
      .catch(err => {
        closeModal();
        setMessage({ error: "Something went wrong! try again later" });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="items-section">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {message.success && <div className="success">{message.success}</div>}
          {message.error && <div className="danger">{message.error}</div>}
          {items?.length > 0 ? (
            items.map((item, index) => (
              <CategoryItem
                onClickDelete={() => openModal(item)}
                item={item}
                key={item?._id}
                withBtns={true}
              />
            ))
          ) : (
            <h1>There are no Items</h1>
          )}
        </>
      )}

      <Modal
        onPressConfirm={onDelete}
        text={`Delete ${selectedItem?.title}`}
        modalOpen={modalOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
