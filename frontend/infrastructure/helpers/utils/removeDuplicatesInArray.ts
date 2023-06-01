export const removeDuplicatesInArray = <T>(
  array: T[],
  callback: (item: T) => unknown
): T[] => {
  const uniqueArray = [];
  const map = new Map();
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const callbackResult = callback(item);
    if (!map.has(callbackResult)) {
      map.set(callbackResult, true);
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
};
