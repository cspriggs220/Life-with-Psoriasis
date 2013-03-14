
$(document).ready(function(){

$('#treatTabs a').tab();
        var mapOptions = {
          center: new google.maps.LatLng(36.1666667, -86.78333329999998),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
   
var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
autocomplete.bindTo('bounds',map);

var service = new google.maps.places.PlacesService(map);

google.maps.event.addListener(autocomplete, 'place_changed', function() {
	var infoWindow = new google.maps.InfoWindow();
  infoWindow.close();
  var loc = autocomplete.getPlace();
  var lat= loc.geometry.location.mb;
  var lon= loc.geometry.location.nb;
  var request= {
  	location: new google.maps.LatLng (lat, lon),
  	radius: '5000',
  	query: 'dermatologist'
  };
  service.textSearch(request, callback);
  if (loc.geometry.viewport) {
    map.fitBounds(loc.geometry.viewport);
  } else {
    map.setCenter(loc.geometry.location);
    map.setZoom(15);
  }
  
});  //en google.maps event listener
function callback(results, status) {
	if (status===google.maps.places.PlacesServiceStatus.OK) {
		for (var i=0; i<results.length; i++){
			var place= results[i];
			createMarker(results[i]);
		};
	};
	console.log(results.length);
};
function createMarker (place) {
	var marker = new google.maps.Marker({
  		map: map
		});
	var infoWindow = new google.maps.InfoWindow();
	marker.setPosition(place.geometry.location);
  	infoWindow.setContent('<div><strong>' + place.name + '</strong><br><p>'+ place.formatted_address +'</p><a href="'+ place.website +'" >'+ place.website +'</a>');
  	google.maps.event.addListener(marker,'click',function(e){
		infoWindow.open(map, marker);
		});
  	google.maps.event.addListener(map, 'click', function(e){
  		infoWindow.close();
  	})
	};
});  //end ready