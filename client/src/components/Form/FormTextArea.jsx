import React from "react";

const FormTextArea = ({ label, name, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered h-36 w-full"
        name={name}
        defaultValue={defaultValue}
      ></textarea>
    </label>
  );
};

export default FormTextArea;
