// module.exports = function fitnessFunction(phenotype) {

// let tempcount = 0;
function fitnessFunction(phenotype) {
  const arr = [startLocation].concat(phenotype).concat(startLocation);
  var prev = arr[0];
  var distances = arr.slice(1).map(function (item) {
    result = [prev, item];
    prev = item;
    return result;
  });
  var distance = distances.reduce(function (total, item) {
    return total + calculateRouteDistance(item[0], item[1]);
  }, 0);

  // if (tempcount < 100) {
  // console.log(arr, distance);
  // tempcount++;
  // }

  return -1 * distance;
}

var calculateRouteDistance = function (a, b) {
  return distanceMatrix[a.id][b.id];
};

// var calculateDirectDistance = function (a, b) {
//   return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
// };
