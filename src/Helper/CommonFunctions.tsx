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

export const calculateTaxedAmount = (
  price: any,
  taxRate: any,
) => {
  if (parseFloat(price) < 0 || parseFloat(taxRate) < 0) {
    throw new Error('Both price and taxRate must be non-negative values.');
  }

  const taxAmount = (parseFloat(price) * parseFloat(taxRate)) / 100;
  const taxedAmount = parseFloat(price) + taxAmount;
  return taxAmount;
};

export const calculateTotalPrice = (
  total: any,
  discountType: any,
  flatDiscount: any,
  percentageDiscount: any,
) => {
  let totalPrice = total;
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
  }else{
    return 0;
  }
};

export const calculateTotalPrice2 = (
  total: any,
  discountType: any,
  flatDiscount: any,
  percentageDiscount: any,
) => {
  let totalPrice = total;
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
  }else{
    return 0;
  }
};

export const getTotalDiscountAmount = (items: any) => {
  let totalDiscountAmount = 0;
  items.forEach((item: any) => {
    totalDiscountAmount += parseFloat(item.discount_amount || 0);
  });
  return totalDiscountAmount.toFixed(2);
};

export function getTotalTaxAmount(products: any) {
  const totalTaxAmount = products.reduce((acc: any, product: any) => {
    const taxAmount =
      parseFloat(product.total || 0) *
      (parseFloat(product.item_tax_rate || 0) * 0.01);
    return acc + taxAmount;
  }, 0);

  return totalTaxAmount;
}