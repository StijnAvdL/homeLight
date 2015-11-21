var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

Meteor.methods({
	setLightOn: function(on) {
	api.setLightState(2, {"on": on})
		.then(displayResult)
		.fail(displayError)
		.done();
	}
});