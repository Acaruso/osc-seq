function getGrid(numRows, numCols) {
  let outer = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    let inner = new Array(numCols).fill(0);
    outer[i] = inner;
  }
  return outer;
}

export { getGrid }
