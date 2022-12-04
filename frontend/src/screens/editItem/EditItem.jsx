import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import Loading from "../../components/loading/Loading";
import {
  getCategories,
  getSingleItem,
  updateItem,
} from "../../network/network";
import Select from "react-select";
import { getSelectOptions } from "../../helpers/functions";
import placeholderImg from "../../assets/images/placeholder.jpg";

export default function EditItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState({ success: "", error: "" });
  const [selectedOption, setSelectedOption] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [item, setItem] = useState({
    title: "",
    price: 0,
    description: "",
    file: null,
    categoryId: "",
  });

  const handleSubmit = () => {
    updateItem(id, item)
      .then(res => {
        setMessage({
          success: "Item updated successfully",
        });
      })
      .catch(err => {
        setMessage({
          error: "Something went wrong! try again",
        });
      });
  };

  useEffect(() => {
    getCategories().then(res => {
      setCategories(res.data.data);
    });
    getSingleItem(id)
      .then(res => {
        if (res.data.item.image) {
          setImage(res.data.item.image);
        }
        if (res.data.item.categoryId) {
          setSelectedOption({
            value: res?.data?.item?.categoryId?._id,
            label: res?.data?.item?.categoryId?.title,
          });
        }

        setItem({
          title: res.data.item.title,
          price: res.data.item.price ? res.data.item.price : 0,
          description: res.data.item.description,
          categoryId: res.data.item.categoryId?._id,
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  const handleOnChangeFile = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file.target.files[0]);
    setItem({ ...item, file: file.target.files[0] });
  };
  const handleOnChangeTitle = title => {
    setItem({ ...item, title });
  };

  const handleOnChangePrice = price => {
    setItem({ ...item, price });
  };

  const handleOnChangeDescription = description => {
    setItem({ ...item, description });
  };

  const handleOnChangeCategoryId = categoryId => {
    setSelectedOption(categoryId);
    setItem({ ...item, categoryId: categoryId?.value });
  };

  const btnEnabled = () => {
    return item?.title ?? false;
  };
  return (
    <div className="create-category-section">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {message.success && <div className="success">{message.success}</div>}
          {message.error && <div className="danger">{message.error}</div>}
          <h2>Update Category Item</h2>
          <div className="item-image">
            <label htmlFor="item-image">
              <img src={image ? image : placeholderImg} alt="" />
            </label>
            <input onChange={handleOnChangeFile} type="file" id="item-image" />
          </div>
          <CustomInput
            value={item.title}
            onChange={handleOnChangeTitle}
            label={"Item Name"}
            placeholder={"example: Beef Burger"}
            type={"text"}
          />
          <CustomInput
            onChange={handleOnChangeDescription}
            value={item.description}
            label={"Description"}
            placeholder={
              "example: Rolls, beef steak mince, olive oil, ketchup, egg"
            }
            type={"text"}
          />

          <CustomInput
            value={item.price}
            onChange={handleOnChangePrice}
            label={"Price"}
            placeholder={"example: 20"}
            type={"number"}
          />
          <div className="select-container">
            <label className="select-label">Categories</label>
            <Select
              value={selectedOption}
              onChange={handleOnChangeCategoryId}
              options={getSelectOptions(categories)}
            />
          </div>

          <button
            style={!btnEnabled() ? { opacity: 0.7 } : {}}
            disabled={!btnEnabled()}
            onClick={handleSubmit}
          >
           Update
          </button>
        </>
      )}
    </div>
  );
}
