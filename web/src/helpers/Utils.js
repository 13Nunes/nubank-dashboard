const prepareValue = (value) => {
  // Prepare value
  value = value.toString();
  value = value
    .match(/^(.*)(.{2})/)
    .slice(1)
    .join(".");

  // Format
  return parseFloat(value);
};

const currencyValue = (value) => {
  // Prepare value
  if (value === 0) value = "0000";
  value = value.toString();
  value = value
    .match(/^(.*)(.{2})/)
    .slice(1)
    .join(".");

  // Prepare number formatter.
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format
  return formatter.format(value);
};

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

module.exports = {
  prepareValue,
  currencyValue,
  groupBy,
};
