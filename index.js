function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(
    new google.maps.Map(document.getElementById("map-layer"), {
      center: new google.maps.LatLng(8.340742, 80.414055),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    })
  );

  $("#go").on("click", function () {
    const waypoints = getLocations().map((l) => {
      return { location: new google.maps.LatLng(l.x, l.y), stopover: true };
    });
    var locationCount = waypoints.length;
    if (locationCount > 0) {
      // var start = new google.maps.LatLng(8.340742, 80.414055);
      // var end = new google.maps.LatLng(8.331899, 80.403058);

      var start = waypoints[0].location;
      var end = waypoints[waypoints.length - 1].location;
      drawPath(directionsService, directionsDisplay, start, end, waypoints);
    }

    // for (let i = 0; i < waypoints.length - 1; i++) {
    //   drawPath(
    //     directionsService,
    //     directionsDisplay,
    //     waypoints[i].location,
    //     waypoints[i + 1].location,
    //     null
    //   );
    // }
  });
}

function drawPath(directionsService, directionsDisplay, start, end, waypoints) {
  directionsService.route(
    {
      origin: start,
      destination: end,
      unitSystem: google.maps.UnitSystem.METRIC,
      waypoints: waypoints,
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
