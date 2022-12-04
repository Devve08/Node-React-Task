import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "./categoryItem/CategoryItem";

const Category = ({ cat, withoutItems, onClickDelete }, ref) => {
  return (
    <>
      <div ref={ref} className="cat_text" key={cat?._id}>
        {cat.title}
        {withoutItems && (
          <div>
            <button>
              <Link to={`${cat._id}`}>Edit</Link>
              </button>
            <button onClick={onClickDelete}>Delete</button>
          </div>
        )}
      </div>
      {cat?.items?.length > 0 &&
        !withoutItems &&
        cat?.items?.map(item => <CategoryItem key={item?._id} item={item} />)}
    </>
  );
};

export default forwardRef(Category);
