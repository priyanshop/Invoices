export const removeObjectByIndex = (array: any, index: any) => {
  const newArray = array.filter((item: any, i: any) => i !== index);
  return newArray;
};
