export function formatPrice(price: number, currency = "EUR", type?: "sale" | "rent") {
  const value = new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
  return type === "rent" ? `${value} / month` : value;
}
