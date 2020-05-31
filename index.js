function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(
    new google.maps.Map(document.getElementById("map-layer"), {
      center: new google.maps.LatLng(startLocation.x, startLocation.y),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    })
  );

  $("#go").on("click", function () {
    const bestRoutes = getBestRoute().map((l) => {
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
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Problem in showing direction due to " + status);
      }
    }
  );
}
