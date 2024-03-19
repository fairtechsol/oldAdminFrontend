export const formatNumber = (value?: any, isRound?: any) => {
  if (value >= 1000) {
    // return (value / 1000).toFixed(1) + "k";
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
    // return value
  }
};

export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  return order[a?.activeStatus] - order[b?.activeStatus];
};

export const formatToINR = (amount:any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
      currency: "INR"
  });
  return formatter.format(parseFloat(amount));
};

export const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};

