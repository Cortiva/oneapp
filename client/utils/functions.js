export const formatNumberN = (number, decimals = 0) => {
  const num = Number(number);
  const formattedNumber = num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedNumber;
};