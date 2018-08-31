const calculateAge = (birthday)  => new Date().getFullYear() - birthday.getFullYear();
const sort = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

module.exports = {
  calculateAge,
  sort
}
