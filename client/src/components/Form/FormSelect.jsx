import React from "react";

const FormSelect = ({ label, name, list, defaultValue }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold capitalize mt-3">{label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered w-full"
        defaultValue={defaultValue}
      >
        {list.map((item)=>{
          return(
            <option key={item} value={item}>
              {item}
            </option>
            
          )
        })}
      </select>
    </div>
  );
};

export default FormSelect;
