const DELIMITER = ',';
export const outputToStdout = async <T>(data: T[]) => {
  const fields = Object.keys(data[0]).join(DELIMITER);

  console.log(fields);
  data.forEach((d) => console.log(Object.values(d).join(DELIMITER)));
};
