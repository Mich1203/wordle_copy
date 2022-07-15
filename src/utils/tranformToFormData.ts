export interface IPayload {
  [key: string]: any;
}

const transformToFormData = (payload: IPayload) => {
  const formData = new FormData();
  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      const element = payload[key];
      if (Array.isArray(element))
        element.forEach((el) => formData.append(key, el));
      else formData.append(key, element);
    }
  }
  return formData;
};

export default transformToFormData;
