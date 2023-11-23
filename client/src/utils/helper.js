export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function dataToCoords(data) {
  return {
    lat: data.features[0].geometry.coordinates[1],
    lng: data.features[0].geometry.coordinates[0],
  };
}
