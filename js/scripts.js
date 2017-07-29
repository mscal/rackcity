console.log('loaded scripts.js');

$.get("js/publicart.csv", function(text){
     var data = Papa.parse(text, {header: true});
     console.log();
});





var closestCycle;
var closestArtLocation;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position){
		   doSomething(position.coords.latitude,position.coords.longitude)
        });  
} else {
  console.log('no location data enabled');
}


function doSomething(latitude, longitude){
	var newLat = latitude;
	var newLong = longitude;


	start = {
		latitude: -27.481438,
		longitude: 153.014593
	}

	$.getJSON("js/bris.json", function(data) {
		var cycleArray = data;
		

			for (var i = cycleArray.length - 1; i >= 0; i--) {
			stop = {
				latitude:cycleArray[i]['latitude'],
				longitude:cycleArray[i]['longitude']
			}
			var newNumber = haversine(start,stop);

			if (typeof lowestNumber == 'undefined'){
				var lowestNumber = newNumber;
			} else{
				if(newNumber < lowestNumber){
					lowestNumber = newNumber;
					closestCycle = cycleArray[i];
					loadedCycle(cycleArray[i]);
			}
				
			}

	};
	//console.log(closestCycle);

	$.get("js/publicart.csv", function(text){
	     var data = Papa.parse(text, {header: true});
	    	checkLocationofArt(data, closestCycle, start)
});


		
	});
	

}

function checkLocationofArt(data, closestCycle, start){
		for (var i =0; i < data.data.length; i++) {
	    		
	    		stop = {
	    			latitude: data.data[i].Lat,
	    			longitude: data.data[i].Long
	    			}
	 			
	    		var newArtNumber = haversine(start,stop);

	    		if (typeof closestArt == 'undefined'){
					var closestArt = newArtNumber;
				} else{
					if(newArtNumber < closestArt){
						closestArt = newArtNumber;
						newArt = data.data[i];
						loadedArt(data.data[i]);
					}
	    		};
			}
			
				curryPot(closestCycle, newArt, start);

}

function loadedCycle(cycleArray){	
	closestCycle = cycleArray;
}

function loadedArt(data){
	closestArtLocation = data;
}
