import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <span>
        <Link className="link" to={"/"}>Home</Link>
      </span>
      <span>
        <Link className="link" to={"admin"}>Admin</Link>
      </span>
    </div>
  );
}
