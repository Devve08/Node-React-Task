import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/images/placeholder.jpg";
import { currencyFormat } from "../../helpers/functions";
import "./CategoryItem.css";

export default function CategoryItem({ item, onClickDelete, withBtns }) {
  const prepareImage = img => {
    if (img) {
      return img;
    } else {
      return placeholderImage;
    }
  };
  return (
    <div className="item_container">
      <div className="item_image">
        <img src={prepareImage(item.image)} alt="" />
      </div>
      <div>
        <div className="item_text">{item?.title}</div>
        <div className="item_desc">{item?.description ?? ""}</div>
      </div>
      <div>
        <div className="item_price">{item?.price ? currencyFormat(item?.price) : 'Not specified'}</div>
      </div>
      {withBtns && (
        <div>
          <button>
            <Link to={`${item?._id}`}>
            Edit</Link>
            </button>
          <button onClick={onClickDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
