import React from "react";
import { FieldType } from "../FieldType";

export interface IOption {
  value: string;
  displayName: string;
}

interface IProps {
  name?: string;
  placeholder?: string;
  units: IOption[];
}

export const ValueUnitField: React.FunctionComponent<IProps> = ({
  name,
  placeholder,
  units,
}) => {
  const [value, setValue] = React.useState("");
  const [unit, setUnit] = React.useState<IOption | undefined>(units[0]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ flex: 1, marginRight: "4px" }}
          type="number"
          placeholder={placeholder}
          onChange={(e: any) => setValue(e.target.value)}
        />
        <select
          onChange={(e: any) =>
            setUnit(units.find((u) => u.value === e.target.value))
          }
          value={unit?.value}
        >
          {units.map((u) => (
            <option key={u.value} value={u.value}>
              {u.displayName}
            </option>
          ))}
        </select>
      </div>
      <input
        type="hidden"
        name={name}
        value={`${value} ${unit?.value}`}
        data-fieldtype={FieldType.VALUE_UNIT_FIELD}
      />
    </>
  );
};
