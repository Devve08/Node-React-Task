import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import Loading from "../../components/loading/Loading";
import { getSingleCategory, updateCategory } from "../../network/network";

export default function EditCategory() {
  const [catName, setCatName] = useState("");
  const [message, setMessage] = useState({ success: "", error: "" });
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const handleSubmit = () => {
    let data = {
      title: catName,
    };
    updateCategory(id, data)
      .then(res => {
        setMessage({ success: "Category added successfully" });
      })
      .catch(err => {
        setMessage({ error: "Something went wrong try again later" });
      });
  };

  const onChange = v => {
    setCatName(v);
  };

  useEffect(() => {
    getSingleCategory(id)
      .then(res => {
        setCategory(res?.data?.category);
        setCatName(res?.data?.category?.title);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  const btnEnabled = () => {
    return catName ?? false;
  };
  return (
    <div className="create-category-section">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {message.success && <div className="success">{message.success}</div>}
          {message.error && <div className="danger">{message.error}</div>}
          <h1>Update Category</h1>

          <CustomInput
            onChange={onChange}
            label={"Category Name"}
            placeholder={"example: Starters"}
            type={"text"}
            value={catName}
          />
          <button
            style={!btnEnabled() ? { opacity: 0.5, cursor: "auto" } : {}}
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
