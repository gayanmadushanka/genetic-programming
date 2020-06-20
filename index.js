function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();

  var map = new google.maps.Map(document.getElementById("map-layer"), {
    center: new google.maps.LatLng(startLocation.x, startLocation.y),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  directionsDisplay.setMap(map);

  $("#findOptimalPath").on("click", function () {
    $("#route").empty();
    const [bestRoute, bestScore] = getBestRoute();

    $("#route").append(
      `<b>Minimum distance = ${bestScore / 1000} km</b><br><br>`
    );

    for (let a = 0; a < bestRoute.length; a++) {
      if (a == bestRoute.length - 1) {
        $("#route").append(`${bestRoute[a].address}<br>`);
      } else {
        $("#route").append(`${bestRoute[a].address}<br>&dArr;<br>`);
      }
    }
    const bestRoutes = bestRoute.map((l) => {
      return { location: new google.maps.LatLng(l.x, l.y), stopover: true };
    });
    drawPath(directionsService, directionsDisplay, bestRoutes);
  });
}

function drawPath(directionsService, directionsDisplay, bestRoutes) {
  directionsService.route(
    {
      origin: bestRoutes[0].location,
      destination: bestRoutes[bestRoutes.length - 1].location,
      unitSystem: google.maps.UnitSystem.METRIC,
      waypoints: bestRoutes,
      optimizeWaypoints: true,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    },
    function (response, status) {
      if (status === "OK") {
        console.log(response);
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Problem in showing direction due to " + status);
      }
    }
  );
}
