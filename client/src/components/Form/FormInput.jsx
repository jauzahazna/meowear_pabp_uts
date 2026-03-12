import React from "react";

const FormInput = ({label, name, type, defaultValue}) => {
  return (
    <label className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold capitalize mt-3">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered w-full"
      />
    </label>
  );
};

export default FormInput;
