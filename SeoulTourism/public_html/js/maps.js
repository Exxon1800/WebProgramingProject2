var locations = []; //stores marker locations
oldId = "";//stores old id of the database, this gets compared to the current id, if it's diffrent then a new entry has been made to the database and the map has to be reloaded
firstTime = true;//true indicates that this is the first time the script is loaded

function initMap() {//causes the getlocations to go before the initMap
    getLocations(continueInitMap); //get locations from database
}

//gets location data from database
function getLocations(_callback) {
    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function () {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText 
        locations = JSON.parse(this.responseText);//remove quotes

        for (var i = 0; i < locations.length; i++) {
            locations[i].lat = parseFloat(locations[i].lat);
            locations[i].lng = parseFloat(locations[i].lng);
        }
        _callback();
    };
    oReq.open("get", "../php/getLocation.php", true); //get locations from database using php
    oReq.send();
}

function continueInitMap() {
    if (firstTime == true) {//first time map centering and zoom
        zoom = 2;
        centerLat = 70;
        centerLng = 220;
    } else {//get the current zoom and centering and apply that for the reload 
        var lat0 = map.getBounds().getNorthEast().lat();
        var lng0 = map.getBounds().getNorthEast().lng();
        var lat1 = map.getBounds().getSouthWest().lat();
        var lng1 = map.getBounds().getSouthWest().lng();

        centerLng = (lng1 - lng0) / 2 + lng0;//get the center lng
        centerLat = (lat1 - lat0) / 2 + lat0;//get the center lat
        zoom = map.getZoom();//get the current zoom
    }
    map = new google.maps.Map(document.getElementById('map'), {//(re)load the map
        zoom: zoom,
        center: {lat: centerLat, lng: centerLng},
        disableDefaultUI: true
    });

    // Create an array of alphabetical characters used to label the markers.
    labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.

    var markers = locations.map(function (location, i) {//place markers
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}


//refresh map on left carousel click to make the map adjust to the resize, else it's grey

function resizeMap() {
    setTimeout(function () {
        google.maps.event.trigger(map, 'resize');
    }, 100);
}


//refresh map if there is a new database entry
$(document).ready(function refreshMarkers(){
    setInterval(function () {
        $.ajax({
            url: '../php/lookForChange.php',
            dataType: 'json',
            success: function (response) {
                var id = response.id;
                if (firstTime == true) {//don't reload the map the first time
                    oldId = id; //set the current id to old id
                    firstTime = false; //first time initialisation is done so firstTime is false
                }
                if (id != oldId) {//if the id retrieved isn't the same as the previous 'old' id then there is a new entry in the db thus the map has to be reloded
                    oldId = id; //set the current id to old id
                    initMap(); // reload the map
                }
            }
        });
    }, 5000); // do this every 5 seconds
});