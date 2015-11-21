if (Meteor.isServer) {
  var HueApi = Npm.require("node-hue-api").HueApi;

  var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
  };

  var api = new HueApi(Meteor.settings.hue.port, Meteor.settings.hue.user);

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

  Meteor.methods({
    setLightOn: function(on) {
    api.setLightState(2, {"on": on})
      .then(displayResult)
      .fail(displayError)
      .done();
    }
  });
}

if (Meteor.isClient) {
  Template.body.events({
    "click .turnOnButton": function() {
      Meteor.call("setLightOn", true);
    },
    "click .turnOffButton": function() {
      Meteor.call("setLightOn", false);
    }
  })
}