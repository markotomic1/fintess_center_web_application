export const checkError = (
  errorClass: string,
  error: { id: string; message: string }[]
): boolean => {
  let value = false;
  error.forEach((error) => {
    if (error.id === errorClass) {
      value = true;
      return;
    }
  });
  return value;
};
