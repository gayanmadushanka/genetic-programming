const geneticAlgorithmConstructor = require("geneticalgorithm");

const fitnessFunction = require("./fitness");
const crossoverFunction = require("./crossover");
const mutationFunction = require("./mutation");

// outline a large square but not in order.
const firstPhenotype = [];
for (i = 2; i < 10; i++) {
  firstPhenotype.push({ x: i, y: 1 });
  firstPhenotype.push({ x: 1, y: i });
  firstPhenotype.push({ x: i, y: 10 });
  firstPhenotype.push({ x: 10, y: i });
}

const geneticAlgorithm = geneticAlgorithmConstructor({
  population: [firstPhenotype],
  populationSize: 1000,
  mutationFunction: mutationFunction,
  crossoverFunction: crossoverFunction,
  fitnessFunction: fitnessFunction,
});

console.log("Starting with:");
console.log(firstPhenotype);

let previousBestScore = 0;

for (let a = 0; a < 100; a++) {
  for (let i = 0; i < 25; i++) {
    geneticAlgorithm.evolve();
  }

  const score = geneticAlgorithm.bestScore();
  if (score == previousBestScore) {
    break;
  }
  previousBestScore = score;
  console.log("Distance is " + -1 * score);
}

const best = geneticAlgorithm.best();

console.log("Finished with:");
console.log(best);
console.log("Distance is " + -1 * fitnessFunction(best));
