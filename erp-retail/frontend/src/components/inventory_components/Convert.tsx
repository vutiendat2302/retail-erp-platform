
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
};

export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1) + " tỷ"
  } else if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + " triệu";
  } else if (amount >= 1_000) {
    return (amount / 1_000).toFixed(1) + " nghìn";
  }
  return formatCurrency(amount);
}

export const formatDate = (date: string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("vi-VN").format(num);
}
