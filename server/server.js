var HueApi = Meteor.npmRequire("node-hue-api").HueApi;

var displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2));
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


var os = Npm.require("os");

console.log(os.cpus());