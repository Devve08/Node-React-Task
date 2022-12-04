import React from "react";

export default function CustomInput({ label, type, placeholder, onChange, value }) {
  return (
    <div className="input-container">
      <label htmlFor="">{label}</label>
      <input value={value} onChange={(e)=>onChange(e.target.value)} type={type} placeholder={placeholder} />
    </div>
  );
}
