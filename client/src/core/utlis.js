export const ascendingSort = (data) => {
  let copiedData = data || [];
  const arrLength = copiedData.length;
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength - i - 1; j++) {
      if (copiedData[j].createdAt > copiedData[j + 1].createdAt) {
        const temp = copiedData[j];
        copiedData[j] = copiedData[j + 1];
        copiedData[j + 1] = temp;
      }
    }
  }
  return copiedData;
};
