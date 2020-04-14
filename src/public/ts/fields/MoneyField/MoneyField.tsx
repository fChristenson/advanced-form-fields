import React from "react";
import { FieldType } from "../FieldType";

interface IProps {
  name?: string;
  currency: string;
  placeholder?: string;
}

export const MoneyField: React.FunctionComponent<IProps> = ({
  name,
  placeholder,
  currency,
}) => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <input
        type="number"
        placeholder={placeholder}
        onChange={(e: any) => setValue(`${e.target.value} ${currency}`)}
      />
      <input
        type="hidden"
        name={name}
        value={value}
        data-fieldtype={FieldType.MONEY_FIELD}
      />
    </>
  );
};
