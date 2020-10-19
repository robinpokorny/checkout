export const resolver = <T = any, U = any>(
  promise: Promise<T>,
): Promise<[T | null, U | any]> => {
  return new Promise(resolve => {
    promise
      .then((response: any) => {
        resolve([response, null]);
      })
      .catch(error => {
        resolve([null, error]);
      });
  });
};
