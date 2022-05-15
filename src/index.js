
const genDiff = (first, second) => {

  const firstObj = JSON.parse(first);
  const firstKey = Object.keys(firstObj);

  const secondObj = JSON.parse(second);
  const secondKey = Object.keys(secondObj);

  const commonObj = Object.assign({}, firstObj, secondObj);
  console.log(commonObj);
  const commonKeys = Object.keys(commonObj).sort();
  
  const getDifference = commonKeys.reduce((acc, key) => {
    const firsValue = firsObj[key];
    const secondValue = secondObj[key];

    const firstHas = firstKey.includes(key);
    const secondHas = secondKey.includes(key);

    if (firstHas && secondHas && firsValue === secondValue) {
      return [...acc, ['', `${key}:`, firsValue]]
    }
    if (firstHas && secondHas && firsValue !== secondValue) {
      return [...acc, ['-', `${key}:`, firsValue], ['+', `${key}:`, secondValue]];
    }
    if (!firstHas && secondHas) {
      return [...acc, ['+', `${key}:`, secondValue]];
    }
    if (firstHas && !secondHas) {
      return [...acc, ['-', `${key}:`, firsValue]];
    }
  }, []);
  const diffString =  getDifference.map(field => field.join(' '));
  const res = `{\n${diffString.join('\n')}\n}`;
  console.log(res);
};



export default genDiff;
