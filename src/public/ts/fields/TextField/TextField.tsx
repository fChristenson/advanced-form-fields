import React from "react";
import { FieldType } from "../FieldType";

interface IProps {
  name?: string;
  placeholder?: string;
}

export const TextField: React.FunctionComponent<IProps> = ({
  name,
  placeholder,
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      data-fieldtype={FieldType.TEXT_FIELD}
    />
  );
};
