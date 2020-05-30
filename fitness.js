// module.exports = function fitnessFunction(phenotype) {
function fitnessFunction(phenotype) {
  var calculateDistance = function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  };

  var prev = phenotype[0];
  //console.log("The phenotype are " + JSON.stringify(phenotype))
  var distances = phenotype.slice(1).map(function (item) {
    result = [prev, item];
    prev = item;
    return result;
  });
  //console.log("The distances are " + JSON.stringify(distances))
  var distance = distances.reduce(function (total, item) {
    //console.log("item = " + JSON.stringify(item) )
    return total + calculateDistance(item[0], item[1]);
  }, 0);
  //console.log("total = " + distance )
  return -1 * distance;
}
