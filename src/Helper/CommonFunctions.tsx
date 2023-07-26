export const removeObjectByIndex = (array: any, index: any) => {
  const newArray = array.filter((item: any, i: any) => i !== index);
  return newArray;
};


export const discountPrice = (
  itemPrice: any,
  quantity: any,
  discountType: any,
  flatDiscount: any,
  percentageDiscount: any,
) => {
  let totalPrice = itemPrice * (quantity || 1);
  if (discountType !== 'No Discount') {
    if (discountType === 'Flat Amount' && flatDiscount && flatDiscount > 0) {
      return flatDiscount;
    }
    if (
      discountType === 'Percentage' &&
      percentageDiscount &&
      percentageDiscount > 0
    ) {
      const percentageAmount = (totalPrice * percentageDiscount) / 100;
      return percentageAmount;
    }
  }
  return 0;
};