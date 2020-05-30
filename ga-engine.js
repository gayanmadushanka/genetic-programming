// const geneticAlgorithmConstructor = require("geneticalgorithm");

// const fitnessFunction = require("./fitness");
// const crossoverFunction = require("./crossover");
// const mutationFunction = require("./mutation");

function getLocations() {
  const firstPhenotype = [];
  firstPhenotype.push({ x: 8.340742, y: 80.414055 });
  firstPhenotype.push({ x: 8.342504, y: 80.411984 });
  firstPhenotype.push({ x: 8.331899, y: 80.403058 });
  firstPhenotype.push({ x: 8.340777, y: 80.407721 });
  firstPhenotype.push({ x: 8.333028, y: 80.410373 });
  // firstPhenotype.push({ x: 8.333569, y: 80.40971 });
  // firstPhenotype.push({ x: 8.336013, y: 80.40754 });
  // firstPhenotype.push({ x: 8.329794, y: 80.407288 });

  // firstPhenotype.push({ x: 8.300742, y: 80.514055 });
  // firstPhenotype.push({ x: 8.372504, y: 80.511984 });
  // firstPhenotype.push({ x: 8.301899, y: 80.503058 });
  // firstPhenotype.push({ x: 8.390777, y: 80.607721 });
  // firstPhenotype.push({ x: 8.433028, y: 80.810373 });
  // firstPhenotype.push({ x: 8.533569, y: 80.90971 });
  // firstPhenotype.push({ x: 8.636013, y: 80.10754 });
  // firstPhenotype.push({ x: 8.629794, y: 80.507288 });

  const geneticAlgorithm = geneticAlgorithmConstructor({
    population: [firstPhenotype],
    populationSize: 1000,
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
  });

  //   console.log("Starting with:");
  //   console.log(firstPhenotype);

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
  return best;
}

// getLocations();
