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

const onSubmit = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  const values = Object.values(e.target)
    .filter((t: any) => t.name)
    .map((t: any) => t.value)
    .filter((v) => !!v);

  alert(values);
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
      <ValueUnitField name="income" units={units} placeholder="Taxes" />
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
