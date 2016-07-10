const types = [
  {
    humanName: 'Reference object',
    name: 'referenceObject',
    possibleChildren: [],
  },
  {
    humanName: 'Hierarchy level',
    name: 'hierarchyLevel',
    possibleChildren: ['hierarchyLevel', 'referenceObject'],
  },
  {
    humanName: 'Dimension',
    name: 'dimension',
    possibleChildren: ['referenceObject', 'hierarchyLevel'],
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
