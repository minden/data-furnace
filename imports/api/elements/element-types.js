const types = [
  {
    humanName: 'Reference object',
    name: 'referenceObject',
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
    possibleChildren: ['referenceObject', 'dimensionLevel'],
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
