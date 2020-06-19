// partially-mapped crossover
function crossoverFunction(phenotypeA, phenotypeB) {
  var index = Math.round(Math.random() * phenotypeA.length);

  phenotypeX = helper_removeDuplicates(
    helper_concat(index, phenotypeA, phenotypeB)
  );
  phenotypeY = helper_removeDuplicates(
    helper_concat(index, phenotypeB, phenotypeA)
  );

  // move, copy, or append some values from a to b and from b to a
  return [phenotypeX, phenotypeY];
}

function helper_concat(index, phenotypeA, phenotypeB) {
  return phenotypeA
    .slice(0, index)
    .concat(phenotypeB.slice(index))
    .concat(phenotypeA.slice(index));
}

function helper_removeDuplicates(phenotype) {
  var duplicates = {};
  return phenotype.filter(function (item) {
    if (duplicates[JSON.stringify(item)]) {
      return false;
    } else {
      duplicates[JSON.stringify(item)] = true;
      return true;
    }
  });
}
