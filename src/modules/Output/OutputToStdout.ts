const DELIMITER = ',';
/**
 *
 * @param data data which is converted to and outputted as CSV. type T would take `ANY` type.
 */
export const outputToStdout = async <T>(data: T[]) => {
  const fields = Object.keys(data[0]).join(DELIMITER);

  console.log(fields);
  data.forEach((d) => console.log(Object.values(d).join(DELIMITER)));
};
