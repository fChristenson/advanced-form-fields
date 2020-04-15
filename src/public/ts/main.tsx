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
import {
  parseForm,
  IFormTypes,
  IMoney,
  IValueUnit,
  asString,
  asNumber,
  asMoney,
  asValueUnit,
} from "./fields/parseForm";

enum FieldNames {
  USERNAME = "username",
  AGE = "age",
  INCOME = "income",
  TAXES = "taxes",
}

interface IForm {
  username: string;
  age: number;
  income: IMoney;
  taxes: IValueUnit;
}

const onSubmit = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  const data = parseForm(Object.values(FieldNames), e.target);

  const formdata: IForm = {
    username: asString(data[FieldNames.USERNAME]),
    age: asNumber(data[FieldNames.AGE]),
    income: asMoney(data[FieldNames.INCOME]),
    taxes: asValueUnit(data[FieldNames.TAXES]),
  };

  console.log(formdata);
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
      <TextField name={FieldNames.USERNAME} placeholder="Username" />
      <NumberField name={FieldNames.AGE} placeholder="Age" />
      <MoneyField
        name={FieldNames.INCOME}
        currency="SEK"
        placeholder="Income/SEK"
      />
      <ValueUnitField
        name={FieldNames.TAXES}
        units={units}
        placeholder="Taxes"
      />
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
