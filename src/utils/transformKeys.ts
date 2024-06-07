import { camelCase, mapKeys } from "lodash";

export const transformKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeysToCamelCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    return mapKeys(obj, (value, key) => camelCase(key));
  }
  return obj;
};
