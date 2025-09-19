function generateBookId() {
  let count = 0;
  return function() {
    return count++;
  } 
}
export const bookIdGenerator = generateBookId()