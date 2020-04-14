import { FieldType } from "./FieldType";

export interface IFormTypes {
  [key: string]: FieldType;
}

export interface IValueUnit {
  amount: number;
  unit: string;
}

export interface IMoney {
  amount: number;
  currency: string;
}

export type FormDataValue = string | number | IValueUnit | IMoney;

interface IFormData {
  [key: string]: FormDataValue;
}

export const parseForm = (formTypes: IFormTypes, form: any): IFormData => {
  const names = Object.keys(formTypes);

  return names.reduce((formData: any, name: string) => {
    const type = formTypes[name];
    const field = form[name];

    if (!field) throw new Error(`${name} not found in form`);

    const fieldType: FieldType | undefined = field.getAttribute(
      "data-fieldtype"
    ) as FieldType;

    if (type !== fieldType)
      throw new Error(
        `fieldType ${type} did not match form fieldType ${fieldType}`
      );

    const value = getValue(field, fieldType);

    formData[name] = value;

    return formData;
  }, {});
};

const getValue = (field: any, fieldType: FieldType): FormDataValue => {
  let value;

  switch (fieldType) {
    case FieldType.TEXT_FIELD: {
      value = field.value as string;
      break;
    }

    case FieldType.NUMBER_FIELD: {
      value = parseFloat(field.value);
      break;
    }

    case FieldType.MONEY_FIELD: {
      const [amount, currency] = field.value.split(" ");
      value = { amount: parseFloat(amount), currency };
      break;
    }

    case FieldType.VALUE_UNIT_FIELD: {
      const [amount, unit] = field.value.split(" ");
      value = { amount: parseFloat(amount), unit };
      break;
    }

    default:
      throw new Error(`${fieldType} can not be parsed`);
  }

  return value;
};

export const isString = (val: any): string => {
  const isString = typeof val === "string";
  if (!isString) throw new Error(`${val} is not a string`);

  return val as string;
};

export const isNumber = (val: any): number => {
  const isNumber = typeof val === "number";
  if (!isNumber) throw new Error(`${val} is not a number`);

  return val as number;
};

export const isValueUnit = (val: any): IValueUnit => {
  const isNumber = typeof val.amount === "number";
  const isString = typeof val.unit === "string";

  if (!isNumber || !isString)
    throw new Error(`${JSON.stringify(val)} is not a IValueUnit`);

  return { amount: val.amount, unit: val.unit };
};

export const isMoney = (val: any): IMoney => {
  const isNumber = typeof val.amount === "number";
  const isString = typeof val.currency === "string";

  if (!isNumber || !isString)
    throw new Error(`${JSON.stringify(val)} is not a IMoney`);

  return { amount: val.amount, currency: val.currency };
};
