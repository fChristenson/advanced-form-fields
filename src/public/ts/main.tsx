import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { TextField } from "./fields/TextField/TextField";
import { NumberField } from "./fields/NumberField/NumberField";
import { FieldType } from "./fields/FieldType";
import { MoneyField } from "./fields/MoneyField/MoneyField";
import {
  ValueUnitField,
  IOption,
} from "./fields/ValueUnitField/ValueUnitField";
import { parseForm, IField } from "./fields/parseForm";

const fields: IField[] = [
  {
    name: "username",
    type: FieldType.TEXT_FIELD,
  },
  {
    name: "age",
    type: FieldType.NUMBER_FIELD,
  },
  {
    name: "income",
    type: FieldType.MONEY_FIELD,
  },
  {
    name: "taxes",
    type: FieldType.VALUE_UNIT_FIELD,
  },
];

const onSubmit = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  const data = parseForm(fields, e.target);

  console.log(data);
};

const units: IOption[] = [
  {
    value: "percent",
    displayName: "%",
  },
  {
    value: "sek",
    displayName: "SEK",
  },
  {
    value: "gold",
    displayName: "g/Gold",
  },
];

const FormPage = () => {
  return (
    <form
      style={{
        maxWidth: "240px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: "8px",
      }}
      onSubmit={onSubmit}
    >
      <TextField name="username" placeholder="Username" />
      <NumberField name="age" placeholder="Age" />
      <MoneyField name="income" currency="SEK" placeholder="Income/SEK" />
      <ValueUnitField name="taxes" units={units} placeholder="Taxes" />
      <input type="submit" />
    </form>
  );
};

const App = () => (
  <BrowserRouter>
    <Route exact path="/" render={() => <FormPage />} />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
