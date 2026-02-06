export function getModifiedProps<T extends Record<string, any>>(newObj: Partial<T>, original: T): Partial<T> {
  return Object.keys(newObj).reduce((acc, key) => {
    if (newObj[key as keyof T] !== original[key as keyof T]) {
      acc[key as keyof T] = newObj[key as keyof T];
    }
    return acc;
  }, {} as Partial<T>);
}
