const randomColorGen = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const dateFormatter = (zuluDate: String) => {
  return (
    zuluDate.substring(0, 4) +
    "-" +
    zuluDate.substring(5, 7) +
    "-" +
    zuluDate.substring(8, 10)
  );
};

export { randomColorGen, dateFormatter };
