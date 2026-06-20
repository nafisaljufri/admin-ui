import React from "react";
import Input from "./Input";

function LabeledInput(props) {
  const { label, id, field, form, ...rest } = props;
  
  const finalId = id || field?.name;

  return (
    <>
      <label htmlFor={finalId} className="block text-sm mb-2">
        {label}
      </label>
      <Input id={finalId} {...field} {...rest} />
    </>
  );
}

export default LabeledInput;