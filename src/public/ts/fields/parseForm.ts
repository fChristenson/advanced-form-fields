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

export const parseForm = <T>(formTypes: IFormTypes, form: any): T => {
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

const getValue = (field: any, fieldType: FieldType) => {
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
