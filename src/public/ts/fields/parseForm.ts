import { FieldType } from "./FieldType";

export interface IField {
  name: string;
  type: FieldType;
}

export const parseForm = (fields: IField[], form: any) => {
  return fields.reduce((formData: any, f) => {
    const field = form[f.name];
    const fieldType: FieldType | undefined = field.getAttribute(
      "data-fieldtype"
    ) as FieldType;

    let value;

    switch (fieldType) {
      case FieldType.TEXT_FIELD: {
        value = field.value;
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
        break;
    }

    formData[f.name] = value;

    return formData;
  }, {});
};
