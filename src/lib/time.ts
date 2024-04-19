// years
export const years: number[] = [];

const currentYear = new Date().getFullYear() + 1;
for (let year = currentYear - 10; year < currentYear; year++) {
  years.push(year);
}

years.sort((a, b) => b - a);

// months
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
