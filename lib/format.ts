export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("am-ET", {
    style: "currency",
    currency: "ETB",
  }).format(price);
};
