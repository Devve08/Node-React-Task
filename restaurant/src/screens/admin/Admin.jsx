import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  return (
    <div className="admin-section">
      <div className="admin-left-section">
        <Link className="link-admin" to={"create-category"}>Create Category</Link>
        <Link className="link-admin" to={"create-item"}>Create Item Category</Link>
        <Link className="link-admin" to={"categories"}>Categories</Link>
        <Link className="link-admin" to={"category-items"}>Item Categories</Link>
      </div>
      <div className="admin-right-section">
        <Outlet />
      </div>
    </div>
  );
}
