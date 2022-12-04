import React, { useEffect, useState } from "react";
import Category from "../../components/Category";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/modal/Modal";
import { deleteCategory, getCategories } from "../../network/network";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  const openModal = cat => {
    setModalOpen(true);
    setSelectedCat(cat);
  };

  const onDelete = () => {
    deleteCategory(selectedCat._id)
      .then(res => {
        console.log(res);
        fetchData();
        closeModal();
        setMessage({ success: "Category deleted successfully" });
      })
      .catch(err => {
        console.log("sd", err);
        closeModal();
        setMessage({ error: "Something went wrong! try again later." });
      });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchData = () => {
    getCategories()
      .then(res => {
        setCategories(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="categories-section">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="categories-inner-section">
          {message.success && <div className="success">{message.success}</div>}
          {message.error && <div className="danger">{message.error}</div>}

          {categories?.length > 0 ? (
            categories?.map((cat, index) => (
              <Category
                onClickDelete={() => openModal(cat)}
                withoutItems={true}
                key={cat._id}
                cat={cat}
              />
            ))
          ) : (
            <h1> There are no Categories </h1>
          )}
        </div>
      )}
      <Modal
        onPressConfirm={onDelete}
        text={`Delete "${selectedCat?.title}"?`}
        closeModal={closeModal}
        modalOpen={modalOpen}
      />
    </div>
  );
}
