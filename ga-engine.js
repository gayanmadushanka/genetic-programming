function getBestRoute() {
  const geneticAlgorithm = geneticAlgorithmConstructor({
    population: [locations],
    populationSize: 1000,
    fitnessFunction: fitnessFunction,
    crossoverFunction: crossoverFunction,
    mutationFunction: mutationFunction,
  });

  let previousBestScore = 0;

  const terminationCount = 10;
  let count = 0;
  for (let a = 0; a < 100; a++) {
    for (let i = 0; i < 25; i++) {
      geneticAlgorithm.evolve();
    }

    const score = geneticAlgorithm.bestScore();

    if (score == previousBestScore) {
      count++;
      // Termination Condition
      if (terminationCount == count) {
        break;
      }
    } else {
      count = 0;
    }

    previousBestScore = score;
    console.log("Distance is " + -1 * score);
  }

  const best = geneticAlgorithm.best();
  const bestRoutes = [startLocation].concat(best).concat(endLocation);

  const bestScore = -1 * fitnessFunction(best);

  console.log("Finished with:");
  console.log(bestRoutes);
  console.log("Distance is " + bestScore);
  return [bestRoutes, bestScore];
}

let distanceMatrix;

function calculateDistance(cb) {
  let allLocations = [startLocation].concat(locations);

  distanceMatrix = new Array(allLocations.length);
  for (i = 0; i < allLocations.length; i++) {
    distanceMatrix[i] = new Array(allLocations.length);
  }

  let origins = [];
  let destinations = [];
  for (const l of allLocations) {
    origins.push(new google.maps.LatLng(l.x, l.y));
    destinations.push(new google.maps.LatLng(l.x, l.y));
  }

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: origins,
      destinations: destinations,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    },
    cb
  );
}

calculateDistance(function callback(response, status) {
  if (status === "OK") {
    for (const [i, row] of response.rows.entries()) {
      for (const [j, element] of row.elements.entries()) {
        const arr = element.distance.text.split(" ");
        if (arr[1] == "km") {
          distanceMatrix[i][j] = Number(arr[0]) * 1000;
        } else {
          distanceMatrix[i][j] = Number(arr[0]);
        }
      }
    }
  } else {
    window.alert("Problem in calculating distance due to " + status);
  }
});
