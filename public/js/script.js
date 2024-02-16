const searchInput = document.getElementById('searchInput');
const voiceBtn = document.getElementById('voiceBtn');
const searchResults = document.getElementById('searchResults');
const statusResult = document.getElementById('status');

voiceBtn.addEventListener('click', function() {
    recognizeSpeech();
});

function recognizeSpeech() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        
        statusResult.style.display = 'block';
        statusResult.innerHTML = `<p>Talk now. I am listening</p>....`;
        setTimeout(function() {
            statusResult.style.display = 'none';
        }, 10000);
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        search();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error occurred: ' + event.error);
    };

    recognition.start();
}

function search() {
    const query = searchInput.value.trim();
    // Here you can implement your search logic
    // For demonstration, just showing the search query in the results div
    searchResults.style.display = 'block';
    searchResults.innerHTML = `<p>Search query: ${query}</p>`;
}
//get location
var map = L.map('map').setView([21.005, 75.08], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add a marker for the destination
  var destinationMarker = L.marker([23.205, 77.08]).addTo(map);
  destinationMarker.bindPopup("Destination").openPopup();

  // Initialize the routing control (without waypoints)
  var routingControl = L.Routing.control({
    routeWhileDragging: false
  }).addTo(map);

  // Use Geolocation API to get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLocation = [position.coords.latitude, position.coords.longitude];

      // Set user's current location as the map center
      map.setView(userLocation, 13);

      // Add a marker for user's current location
      var userMarker = L.marker(userLocation).addTo(map);
      userMarker.bindPopup("Your Location").openPopup();

      // Update the routing control with the new start point
      routingControl.setWaypoints([
        userLocation,          // Start point (user's current location)
        L.latLng(23.205, 77.08) // Destination point
      ]);
    }, function() {
      console.error("Error getting user's location.");
    });
  } else {
    console.error("Geolocation is not supported by your browser.");
  }