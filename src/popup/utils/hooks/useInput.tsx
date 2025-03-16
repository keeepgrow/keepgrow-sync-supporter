import React, { useState } from "react";

const useInput = (initialValue, validator?) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    // event가 checkbox일 경우
    if (event.target.type === "checkbox") {
      setValue(event.target.checked);
      return;
    }

    const {
      target: { value }
    } = event;

    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, setValue, onChange };
};

export default useInput;
