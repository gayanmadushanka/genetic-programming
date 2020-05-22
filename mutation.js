module.exports = function mutationFunction(phenotype) {
  var gene1_index = Math.floor(Math.random() * phenotype.length);
  var gene2_index = Math.floor(Math.random() * phenotype.length);
  var temp = phenotype[gene1_index];
  phenotype[gene1_index] = phenotype[gene2_index];
  phenotype[gene2_index] = temp;
  //console.log("mutant = " + JSON.stringify(phenotype))
  return phenotype;
};
