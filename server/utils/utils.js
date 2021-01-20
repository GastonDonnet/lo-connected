const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      filteredObj[el] = obj[el];
    }
  });

  return filteredObj;
};

const arrayOnlyIncludes = (arr1, arr2) => {
  // Expect: Si hay un elemento de Arr1 que no este en Arr2 retorna falso
  // Expect: Arr1=[1,2,3] Arr2=[3,2,1] return true
  // Expect: Arr1=[1,2,] Arr2=[3,2,1] return true
  // Expect: Arr1=[1,2,3,4] Arr2=[3,2,1] return false

  // if (typeof arr1 != 'object' || typeof arr2 != 'object') {
  //   throw new Error('Solo compara Arrays!');
  // }

  arr1.forEach((el) => {
    if (!arr2.includes(el)) {
      // Si el Array 2 no contiene un elemento de Array 1 return falso
      return false;
    }
  });
  return true;
};

module.exports = {
  filterObj,
  arrayOnlyIncludes,
};
