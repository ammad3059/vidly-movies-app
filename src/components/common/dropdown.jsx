import React from "react";

const DropDown = ({ label, name, onChange, error, value, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        value={value}
        name={name}
        className="form-control"
        onChange={onChange}
      >
        <option value="" />
        {options.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
