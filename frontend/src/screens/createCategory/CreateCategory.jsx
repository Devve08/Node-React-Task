import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { createCategory } from "../../network/network";
import "./CreateCategory.css";

export default function CreateCategory() {
  const [catName, setCatName] = useState("");
  const [message, setMessage] = useState({ success: "", error: "" });

  const handleSubmit = () => {
    let data = {
      title: catName,
    };
    createCategory(data)
      .then(res => {
        setMessage({ success: "Category added successfully" });
        setCatName('')
      })
      .catch(err => {
        setMessage({ error: "Something went wrong try again later" });
      });
  };

  const onChange = v => {
    setCatName(v);
  };

  const btnEnabled = () => {
    return catName ?? false;
  };

  return (
    <>
      <div className="create-category-section">
        {message.success && <div className="success">{message.success}</div>}
        {message.error && <div className="danger">{message.error}</div>}
        <h1>Create Category</h1>

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
          Create
        </button>
      </div>
    </>
  );
}
