const getValue= (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const makePlain = (diff) => {
  const iter = (innerDiff, route) => {
    const plainResult = innerDiff.map((element)=> {
      const root = `${route}${element.name}`;
      switch (element.type) {
        case 'same':
          return `Proppery ${root} has not been changed`;
        case 'changed':
          return `Property ${root} has been changed from ${getValue(element.valueBefore)} 
          to ${getValue(element.valueAfter)}`;
        case 'deleted':
          return `Property ${root} has been deleted`;
        case 'added':
          return `Property ${root} has been added with value: ${
            getValue(element.valueAfter)
          }`;
        case 'has childeren':
          return `${iter(element.children, `${root}.`)}`;
        default:
          throw Error('Unexpected status:', element.status);
      }
    }, []);
    return plainResult.join('\n');
  };
  return iter(diff, '');
};

export default makePlain;
