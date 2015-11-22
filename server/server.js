// var HueApi = Meteor.npmRequire("node-hue-api").HueApi;
// var lightState = HueApi.lightState;

var hue = Meteor.npmRequire("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};

api = new HueApi(Meteor.settings.hue.port, Meteor.settings.hue.user);

// --------------------------
// Using a promise
api.getVersion().then(displayResult).done();
// or using 'version' alias
api.version().then(displayResult).done();

// --------------------------
// Using a callback
api.getVersion(function(err, config) {
  if (err) throw err;
  displayResult(config);
});
// or using 'version' alias
api.version(function(err, config) {
  if (err) throw err;
  displayResult(config);
});


fs = Npm.require('fs');
var chroma = Meteor.npmRequire("chroma-js");
var colorInterpolator = chroma.scale(["#0000ff", "#ff0000"]).mode('lab');
setInterval(function(){ 

	
	fs.readFile('/Games/MyWifi/Who Is On My Wifi/logs/WSCAN20151122.LOG', 'utf8', function (error,data) {
		if (error) {
			return console.log(error);	
		}
		var logs = data.split("Scan Complete\r\n");
		if(logs.length > 2) {
			// get amount devices
			var rows = logs[1].split("\n");
			var amountDevices = rows.length > 3 ? rows.length -2 : 0;


			
            color = colorInterpolator((amountDevices - 6) / 8).rgb();
            var state = lightState.create().on().rgb(color[0], color[1], color[2]).brightness(100);
            
            api.setLightState(2, state)
                .then(displayResult)
                .fail(displayError)
                .done();


			console.log("Ammount devices = " + amountDevices);
			// rewrite file
			fs.writeFile('/Games/MyWifi/Who Is On My Wifi/logs/WSCAN20151122.LOG', logs[1]+"Scan Complete\r\n", function (err) {
				if (err) throw err;
				console.log('It\'s saved!');
			});

		} else {
			console.log("No new log found");
		}
	});
}, 60000);