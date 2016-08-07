const types = [
  {
    humanName: 'Business Object',
    name: 'businessObject',
    possibleChildren: [],
  },
  {
    humanName: 'Dimension Level',
    name: 'dimensionLevel',
    possibleChildren: ['dimensionLevel', 'attribute'],
  },
  {
    humanName: 'Dimension',
    name: 'dimension',
    possibleChildren: ['dimensionLevel'],
  },
  {
    humanName: 'Attribute',
    name: 'attribute',
    possibleChildren: [],
  },
];

types.nameToHumanName = (name) => {
  const returnType = types.find((type) => {
    if (type.name === name) {
      return true;
    }
    return false;
  });
  return returnType.humanName;
};

export default types;
