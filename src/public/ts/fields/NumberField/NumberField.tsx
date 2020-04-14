import React from "react";
import { FieldType } from "../FieldType";

interface IProps {
  name?: string;
  placeholder?: string;
}

export const NumberField: React.FunctionComponent<IProps> = ({
  name,
  placeholder,
}) => {
  return (
    <input
      type="number"
      name={name}
      placeholder={placeholder}
      data-fieldtype={FieldType.NUMBER_FIELD}
    />
  );
};
